import { Layer, Rect, Image } from 'react-konva';
import { useDispatch } from 'react-redux';

import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import {
  removeItem,
  updateOne,
  updateOneWithoutHistory,
} from '../../features/items/itemsSlice';
import {
  CollisionState,
  IPlaceableItem,
  PlacementShadow,
} from '../../lib/item/placeableItem';
import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';
import { Fragment, MutableRefObject, useEffect, useRef } from 'react';
import { Point } from '../../lib/point';

import { selectSelectedItemId } from '../../features/interactions/interactionsSelectors';
import { useAppSelector } from '../../app/hooks';
import {
  select,
  toggleSelect,
} from '../../features/interactions/interactionsSlice';
import { sortSelectedToLast } from '../../lib/itemList';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDispatchDropItem } from '../../features/items/itemsHooks';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import { PlaygroundState } from '../../features/playgrounds/playgroundState';
import { setVisibleLayer } from '../../features/playgrounds/playgroundSlice';

const useTrackCollisions = () => {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const items = useBuildItemList();

  useEffect(() => {
    items.placeable().forEach((item) => {
      const oldCollisionState = item.collisionState;
      item.updateCollisions(items, playground);
      if (oldCollisionState !== item.collisionState) {
        dispatch(
          updateOne({
            id: item.id,
            changes: ItemReduxAdapter.itemToState(item),
          })
        );
      }
    });
  }, [items, playground, dispatch]);
};

export default function PlaygroundItems() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const items = useBuildItemList();
  const selectedItemIds = useAppSelector(selectSelectedItemId);
  const dispatchDropItem = useDispatchDropItem();

  function updatePlacement(item: IPlaceableItem, newPosition: Point) {
    dispatch(select(item.id));
    dispatch(setVisibleLayer(item.layer));
    item.drag(newPosition, items, playground);
    dispatch(
      updateOneWithoutHistory({
        id: item.id,
        changes: ItemReduxAdapter.itemToState(item),
      })
    );
  }

  function dropAndUpdateItemCollisions(item: IPlaceableItem): void {
    const itemDroppedOnPlayground = item.drop(items, playground);
    if (itemDroppedOnPlayground) {
      dispatchDropItem(item);
    } else {
      dispatch(removeItem(item.id));
    }
  }

  useTrackCollisions();

  return (
    <Layer>
      {sortSelectedToLast(items, selectedItemIds)
        .placeable()
        .map((item) => {
          return (
            <Fragment key={item.id}>
              <Item
                item={item}
                updatePlacement={updatePlacement}
                dropAndUpdateItemCollisions={dropAndUpdateItemCollisions}
              />
              <Shadow shadow={item.placementShadow} />
            </Fragment>
          );
        })}
    </Layer>
  );
}

/**
 * This 'hack' with refs & effects seems to be the best way
 * to detect keyboard events along with a click.
 */
const useHandleItemClicks = (
  item: IPlaceableItem,
  itemRef: MutableRefObject<any>
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickKeyboardEvents = (e: any) => {
      if (e.metaKey) {
        dispatch(toggleSelect(item.id));
      } else {
        dispatch(select(item.id));
      }
    };

    if (itemRef && itemRef.current) {
      const currentItemRef = itemRef.current;
      currentItemRef.addEventListener('click', handleClickKeyboardEvents);

      return () => {
        currentItemRef.removeEventListener('click', handleClickKeyboardEvents);
      };
    }
  }, [dispatch, item.id, itemRef]);
};

const Item = ({
  item,
  updatePlacement,
  dropAndUpdateItemCollisions,
}: {
  item: IPlaceableItem;
  updatePlacement: (item: IPlaceableItem, newPosition: Point) => void;
  dropAndUpdateItemCollisions: (item: IPlaceableItem) => void;
}) => {
  if (!item.image) throw new Error('Image not found in ImageItem component');
  const playground = useSelectPlayground();

  // create manually instead of using Konva's `use-image` package.
  // useImage() asynchronously loads the image every time the component mounts, causing flickering on zoom (because children of the Stage re-mount).
  const imageObj = new window.Image();
  imageObj.src = item.image;

  const selectedItemIds = useAppSelector(selectSelectedItemId);

  const setContainerCursor = (
    cursor: string,
    e: KonvaEventObject<MouseEvent>
  ) => {
    if (!playground.showLayer[item.layer]) return;
    if (e.target.getStage()?.container()) {
      const container = e.target?.getStage()?.container();
      if (container) {
        container.style.cursor = cursor;
      }
    }
  };

  const handleDragMove = (e: KonvaEventObject<MouseEvent>) => {
    updatePlacement(item, { x: e.target.x(), y: e.target.y() });

    setContainerCursor('grabbing', e);
  };

  const handleDragEnd = (e: KonvaEventObject<MouseEvent>) => {
    dropAndUpdateItemCollisions(item);

    setContainerCursor('grab', e);
  };

  const itemRef = useRef<any>(null);

  useHandleItemClicks(item, itemRef);

  return (
    <>
      {item.modifierImages.length > 0
        ? item.modifierImages.map((modifierImage) => {
            return (
              <ModifierImage
                item={item}
                image={modifierImage}
                playground={playground}
                handleDragEnd={handleDragEnd}
                handleDragMove={handleDragMove}
                setContainerCursor={setContainerCursor}
                itemRef={itemRef}
                selectedItemIds={selectedItemIds}
                key={modifierImage}
              />
            );
          })
        : null}
      <Image
        key={item.id}
        x={item.x}
        y={item.y}
        ref={itemRef}
        width={item.width}
        height={item.length}
        stroke={getCollisionColor(item.collisionState)}
        strokeWidth={selectedItemIds?.includes(item.id) ? 2 : 1}
        strokeScaleEnabled={false}
        rotation={item.rotation}
        offset={item.offset}
        draggable={playground.showLayer[item.layer]}
        opacity={item.opacity(playground.showLayer)}
        /**
         * don't use imageObj in tests, because there is no window.Image() in tests
         */
        image={process.env.NODE_ENV === 'test' ? undefined : imageObj}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onMouseEnter={(e) => setContainerCursor('grab', e)}
        onMouseLeave={(e) => setContainerCursor('auto', e)}
      />
    </>
  );
};

const ModifierImage = ({
  item,
  image,
  playground,
  handleDragMove,
  handleDragEnd,
  setContainerCursor,
  itemRef,
  selectedItemIds,
}: {
  item: IPlaceableItem;
  image: string;
  playground: PlaygroundState;
  handleDragMove: (e: KonvaEventObject<MouseEvent>) => void;
  handleDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
  setContainerCursor: (cursor: string, e: KonvaEventObject<MouseEvent>) => void;
  itemRef: MutableRefObject<any>;
  selectedItemIds: string[];
}) => {
  const modifierImageObj = new window.Image();
  modifierImageObj.src = image;

  return (
    <Image
      key={item.id}
      x={item.x}
      y={item.y}
      ref={itemRef}
      width={item.width}
      height={item.length}
      stroke={getCollisionColor(item.collisionState)}
      strokeWidth={selectedItemIds?.includes(item.id) ? 2 : 1}
      strokeScaleEnabled={false}
      rotation={item.rotation}
      offset={item.offset}
      draggable
      opacity={item.opacity(playground.showLayer)}
      /**
       * don't use imageObj in tests, because there is no window.Image() in tests
       */
      image={process.env.NODE_ENV === 'test' ? undefined : modifierImageObj}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onMouseEnter={(e) => setContainerCursor('grab', e)}
      onMouseLeave={(e) => setContainerCursor('auto', e)}
    />
  );
};

const getCollisionColor = (collisionState: CollisionState) => {
  switch (collisionState) {
    case CollisionState.CONFLICTED:
      return 'red';
    case CollisionState.NEUTRAL:
      return 'black';
    case CollisionState.CONNECTED:
      return 'green';
  }
};

const Shadow = ({ shadow }: { shadow?: PlacementShadow }) => {
  if (!shadow) return null;

  return (
    <Rect
      x={shadow.x}
      y={shadow.y}
      width={shadow.width}
      height={shadow.length}
      stroke={getCollisionColor(shadow.collisionState)}
      strokeWidth={1}
      strokeScaleEnabled={false}
      offset={shadow.offset}
      draggable
    />
  );
};

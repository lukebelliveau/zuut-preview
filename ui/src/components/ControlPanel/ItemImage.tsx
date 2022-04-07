import RectangleImage from '../../images/items/rectangle.svg';

import { Item } from '../../lib/item';
import { isPlaceableItem } from '../../lib/item/placeableItem';

export function ItemImage({ item }: { item: Item }) {
  if (isPlaceableItem(item)) {
    // overlay modifier images over base image
    return (
      <div className="item-image-container">
        <img className="item-image" src={item.image} alt={item.name} />
        {item.modifierImages.map((modifierImage) => {
          return (
            <img
              className="item-modifier-image"
              src={modifierImage}
              alt={item.name}
              key={modifierImage}
            />
          );
        })}
      </div>
    );
  } else {
    return <img src={RectangleImage} alt={item.name} />;
  }
}

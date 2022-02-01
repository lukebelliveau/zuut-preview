import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { Rect } from 'react-konva';
import PlaceableItem from '../items/placeableItem';

import Playground from '../playground';
import PlaygroundRepository from '../playground/playgroundRepository';

export default class ItemsRenderer {
  playground: Playground;

  constructor(playground: Playground) {
    this.playground = playground;
  }

  render(): React.ReactNode {
    if (this.playground.items.length !== 0) {
      return this.playground.items.map((item) => (
        <Rect
          key={item.id}
          x={item.x}
          y={item.y}
          width={this.convertDistance(item.width)}
          // length={this.convertDistance(item.length)}
          height={this.convertDistance(item.length)}
          stroke="black"
          strokeWidth={1}
          strokeScaleEnabled={false}
          onDragEnd={e => this.updatePlacement(item, e)}
          draggable
      />
      ));
    } else {
      return <></>;
    }
  }

  convertDistance(distance: number) {
    return distance * this.playground.scale;
  }

  updatePlacement(item: PlaceableItem, e: KonvaEventObject<DragEvent>) {
    const repo = PlaygroundRepository.forRedux();
    const existingItem = this.playground.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.x = e.target.x();
      existingItem.y = e.target.y();
      repo.positionItem(this.playground);
    }
  }
}
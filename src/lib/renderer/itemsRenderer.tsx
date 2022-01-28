import React from 'react';
import { Rect } from 'react-konva';
import { Item } from '../items/item';

export default class ItemsRenderer {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  render(): React.ReactNode {
    if (this.items.length !== 0) {
      return this.items.map((item) => (
        <Rect
          x={item.x}
          y={item.y}
          width={item.width}
          length={item.length}
          height={item.height}
          stroke="black"
          strokeWidth={1}
          strokeScaleEnabled={false}
          draggable
      />
      ));
    } else {
      return <></>;
    }
  }
}
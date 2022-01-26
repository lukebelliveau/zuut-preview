import React from 'react';
import { Rect } from 'react-konva';

import Growspace from '../objects/growspace';

export default class ItemsRenderer {
  items: Growspace[];

  constructor(items: Growspace[]) {
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
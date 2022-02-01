export type PlaygroundState = {
  planId: string | undefined;
  displayWidth: number;
  displayHeight: number;
  centerX: number;
  centerY: number;
  scale: number;
  items: ItemState[];
}

export type ItemState = {
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;
}
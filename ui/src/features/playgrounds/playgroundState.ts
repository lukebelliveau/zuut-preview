import { Layer } from '../../lib/layer';

export type PlaygroundState = {
  planId: string;
  displayWidth: number;
  displayHeight: number;
  centerX: number;
  centerY: number;
  scale: number;
  showLayer: Layer
}
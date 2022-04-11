import { Layer } from '../../lib/layer';

export interface LayerState {
  [Layer.FLOOR]: boolean;
  [Layer.CEILING]: boolean;
  [Layer.BOTH]: boolean;
}

export type PlaygroundState = {
  planId: string;
  displayWidth: number;
  displayHeight: number;
  centerX: number;
  centerY: number;
  scale: number;
  showLayer: LayerState;
};

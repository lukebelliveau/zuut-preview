import { Layer } from '../../lib/layer';

export interface LayerState {
  [Layer.FLOOR]: boolean;
  [Layer.CEILING]: boolean;
  [Layer.BOTH]: boolean;
}

export type InteractionsState = {
  selected: string[];
  showLayer: LayerState;
};

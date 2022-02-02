import { PlanState } from '../../features/plans/planState';
import { PlaygroundState } from '../../features/playgrounds/playgroundState';
import Playground from '../playground';

export interface IPlaygroundAdapter {
  select(): PlaygroundState;
  setPlan(plan: PlanState): void;
  setPlayground(playground: PlaygroundState): void;
  zoomIn(params: ZoomParams): void;
  zoomOut(params: ZoomParams): void;
  setDisplayDimensions(width: number, height: number): void;
}

export interface ZoomParams {
  mouseX: number;
  mouseY: number;
  stageX: number;
  stageY: number;
}

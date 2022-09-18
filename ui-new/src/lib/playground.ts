import PlaceableItem from './item/placeableItem';
import { Layer } from './layer';
import Plan from './plan';
import { Point } from './point';

const SCALE_MODIFIER = 20;

type ZoomParams = {
  mouseX: number;
  mouseY: number;
  stageX: number;
  stageY: number;
};

export default class Playground {
  displayWidth: number;
  displayHeight: number;
  scale: number;
  centerX: number = 0;
  centerY: number = 0;
  plan: Plan | undefined;
  items: PlaceableItem[] = [];

  constructor(
    displayWidth: number,
    displayHeight: number,
    scale: number | undefined,
    plan?: Plan,
    centerX: number = 0,
    centerY: number = 0
  ) {
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
    this.plan = plan;
    this.scale = scale || this.initialScale();
    this.centerX = centerX;
    this.centerY = centerY;
  }

  setDisplayDimensions(width: number, height: number) {
    this.displayWidth = width;
    this.displayHeight = height;
    this.scale = this.initialScale();
  }

  initialScale(): number {
    if (this.plan?.room) {
      return 1 / Math.max(this.widthScaleFactor, this.lengthScaleFactor);
    } else {
      return 1;
    }
  }

  place(): Point {
    return {
      x: (this.plan?.room?.width || 0) / 2,
      y: (this.plan?.room?.length || 0) / 2,
    };
  }

  zoomIn(params: ZoomParams) {
    this.zoom(params, 1.05);
  }

  zoomOut(params: ZoomParams) {
    this.zoom(params, 0.95);
  }

  private get widthScaleFactor(): number {
    const width = this.plan?.room?.width || 10;
    return width / (this.displayWidth - SCALE_MODIFIER);
  }

  private get lengthScaleFactor(): number {
    const length = this.plan?.room?.length || 10;
    return length / (this.displayHeight - SCALE_MODIFIER);
  }

  private zoom(params: ZoomParams, scaleFactor: number) {
    const oldScale = this.scale;
    const newScale = this.scale * scaleFactor;

    const mousePointTo = {
      x: (params.mouseX - params.stageX) / oldScale,
      y: (params.mouseY - params.stageY) / oldScale,
    };

    this.scale = newScale;
    this.centerX = params.mouseX - mousePointTo.x * newScale;
    this.centerY = params.mouseY - mousePointTo.y * newScale;
  }
}

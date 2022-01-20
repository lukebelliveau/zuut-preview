import Plan from './plan';
import { Point } from './point';

const SCALE_MODIFIER = 20;

type ZoomParams = {
  mouseX: number;
  mouseY: number;
  stageX: number;
  stageY: number;
}

export default class Playground {
  displayWidth: number;
  displayHeight: number;
  scale: number;
  centerX: number = 0;
  centerY: number = 0;
  plan: Plan | undefined;

  constructor(displayWidth: number, displayHeight: number, scale: number | undefined, plan?: Plan, centerX: number = 0, centerY: number = 0) {
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

  zoomIn(params: ZoomParams) {
    this.zoom(params, 1.05);
  }

  zoomOut(params: ZoomParams) {
    this.zoom(params, 0.95);
  }

  get centerPosition(): Point {
    const x = ((this.centerX / this.displayWidth) * (this.plan?.room?.width || 10)) / this.widthScaleFactor;
    const y = ((this.centerY / this.displayHeight) * (this.plan?.room?.length || 10)) / this.lengthScaleFactor;
    return { x, y };
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

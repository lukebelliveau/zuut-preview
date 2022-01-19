import Plan from './plan';

const SCALE_MODIFIER = 20;

export default class Playground {
  displayWidth: number;
  displayHeight: number;
  scale: number;
  plan: Plan | undefined;

  constructor(displayWidth: number, displayHeight: number, scale: number | undefined, plan?: Plan) {
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
    this.plan = plan;
    this.scale = scale || this.initialScale();
  }

  setDisplayDimensions(width: number, height: number) {
    this.displayWidth = width;
    this.displayHeight = height;
    this.scale = this.initialScale();
  }

  initialScale(): number {
    if (this.plan?.room) {
      const widthScaleFactor = this.plan.room.width / (this.displayWidth - SCALE_MODIFIER);
      const lengthScaleFactor = this.plan.room.length / (this.displayHeight - SCALE_MODIFIER);
      return 1 / Math.max(widthScaleFactor, lengthScaleFactor);
    } else {
      return 1;
    }
  }

  zoomIn() {
    this.scale = this.scale * 1.05;
  }

  zoomOut() {
    this.scale = this.scale * 0.95;
  }
}
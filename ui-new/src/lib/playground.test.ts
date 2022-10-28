import Plan from './plan';
import Playground from './playground';

describe('Playground', () => {
  describe('#initialScale', () => {
    it('calculates a scale for a square', () => {
      const plan = new Plan('square', 10_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);

      expect(playground.initialScale()).toBeCloseTo(0.098, 3);
    });

    it('calculates a scale for a long-width rectangle', () => {
      const plan = new Plan('square', 10_000, 1_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);

      expect(playground.initialScale()).toBeCloseTo(0.098, 3);
    });

    it('calculates a scale for a long-length rectangle', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);

      expect(playground.initialScale()).toBeCloseTo(0.098, 3);
    });
  });

  describe('#zoomIn', () => {
    it('increases zoom by 15%', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, 1, plan);
      playground.zoomIn({
        mouseX: 10,
        mouseY: 10,
        stageX: 20,
        stageY: 20,
      });
      expect(playground.scale).toBe(1.15);
      expect(playground.centerX).toBe(21.5);
      expect(playground.centerY).toBe(21.5);
    });
  });

  describe('#zoomOut', () => {
    it('decreases zoom by 15%', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, 1, plan);
      playground.zoomOut({
        mouseX: 10,
        mouseY: 10,
        stageX: 20,
        stageY: 20,
      });
      expect(playground.scale).toBe(0.85);
      expect(playground.centerX).toBe(18.5);
      expect(playground.centerY).toBe(18.5);
    });
  });
});

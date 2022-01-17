import Plan from './plan';
import Playground from './playground';
import Zoom from './zoom';

describe('Zoom', () => {
  describe('#scale', () => {
    it('calculates a scale for a square', () => {
      const playground = new Playground(1_000, 1_000, '0');
      const plan = new Plan('square', 10_000, 10_000, 12);
      const zoom = new Zoom(playground, plan);

      expect(zoom.scale()).toBeCloseTo(0.092, 3);
    });

    it('calculates a scale for a long-width rectangle', () => {
      const playground = new Playground(1_000, 1_000, '0');
      const plan = new Plan('square', 10_000, 1_000, 12);
      const zoom = new Zoom(playground, plan);

      expect(zoom.scale()).toBeCloseTo(0.092, 3);
    });

    it('calculates a scale for a long-length rectangle', () => {
      const playground = new Playground(1_000, 1_000, '0');
      const plan = new Plan('square', 1_000, 10_000, 12);
      const zoom = new Zoom(playground, plan);

      expect(zoom.scale()).toBeCloseTo(0.092, 3);
    });
  });
});
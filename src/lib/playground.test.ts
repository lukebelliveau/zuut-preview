import Playground from './playground';

describe('Playground', () => {
  describe('#scale', () => {
    it('returns a value for a square', () => {
      const playground = new Playground(10_000, 10_000, '0');
      expect(playground.scale).toBeCloseTo(1 / 10_000);
    });
  });
});
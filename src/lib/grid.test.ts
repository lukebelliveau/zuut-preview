import Grid from './grid';

describe('Grid', () => {
  describe('lines', () => {
    it('returns a set of lines for a room', () => {
      const grid = new Grid(609.6, 609.6);
      expect(grid.lines).toEqual([
        [0, 0, 0, 609.6],
        [304.8, 0, 304.8, 609.6],
        [0, 0, 609.6, 0],
        [0, 304.8, 609.6, 304.8],
      ]);
    });
  });
});

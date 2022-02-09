import Grid from './grid';

describe('Grid', () => {
  describe('#lines', () => {
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

  describe('#snapPostition', () => {
    it('returns the same position for an item aligned along a grid line', () => {
      const grid = new Grid(609.6, 609.6);
      expect(grid.snapPostition({ x: 304.8, y: 304.8 })).toEqual({ x: 304.8, y: 304.8 });
    });

    it('returns the closest position for an item closer to an X gridline on the left', () => {
      const grid = new Grid(609.6, 609.6);
      expect(grid.snapPostition({ x: 314.8, y: 304.8 })).toEqual({ x: 304.8, y: 304.8 });
    });

    it('returns the closest position for an item closer to an X gridline on the right', () => {
      const grid = new Grid(609.6, 609.6);
      expect(grid.snapPostition({ x: 280.8, y: 304.8 })).toEqual({ x: 304.8, y: 304.8 });
    });

    it('returns the closest position for an item closer to a Y gridline on the top', () => {
      const grid = new Grid(609.6, 609.6);
      expect(grid.snapPostition({ x: 304.8, y: 284.8 })).toEqual({ x: 304.8, y: 304.8 });
    });

    it('returns the closest position for an item closer to a Y gridline on the bototm', () => {
      const grid = new Grid(609.6, 609.6);
      expect(grid.snapPostition({ x: 304.8, y: 344.8 })).toEqual({ x: 304.8, y: 304.8 });
    });

    it('returns the same position for an item equidistant from two X gridlines', () => {
      const grid = new Grid(609.6, 609.6);
      expect(grid.snapPostition({ x: 152.4, y: 304.8 })).toEqual({ x: 304.8, y: 304.8 });
    });

    it('returns the same position for an item equidistant from two Y gridlines', () => {
      const grid = new Grid(609.6, 609.6);
      expect(grid.snapPostition({ x: 304.8, y: 152.4 })).toEqual({ x: 304.8, y: 304.8 });
    });

    // it("doesn't allow an item to go off the grid", () => {
    //   const grid = new Grid(609.6, 609.6);
    //   expect(grid.snapPostition({ x: 599, y: 599 })).toEqual({ x: 304.8, y: 304.8 });
    // });
  });
});

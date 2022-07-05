import WindowItem, { WINDOW_ITEM_TYPE } from './windowitem';

describe('WindowItem', () => {
  it("has a type property that is set to 'WindowItem'", () => {
    const window = new WindowItem({
      name: 'window',
      amazonProducts: undefined,
    });
    expect(window.type).toEqual(WINDOW_ITEM_TYPE);
  });

  it('copies into a new WindowItem', () => {
    const window = new WindowItem({
      name: 'window',
      amazonProducts: undefined,
    });
    const copy = window.copy();
    expect(copy instanceof WindowItem).toBe(true);
  });
});

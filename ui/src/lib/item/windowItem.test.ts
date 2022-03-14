import WindowItem, { WINDOW_ITEM_TYPE } from './windowitem';

describe('WindowItem', () => {
  it("has a type property that is set to 'WindowItem'", () => {
    const window = new WindowItem('window');
    expect(window.type).toEqual(WINDOW_ITEM_TYPE);
  });

  it('copies into a new WindowItem', () => {
    const window = new WindowItem('window');
    const copy = window.copy();
    expect(copy instanceof WindowItem).toBe(true);
  });
});

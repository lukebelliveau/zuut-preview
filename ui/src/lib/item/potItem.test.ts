import PotImage from '../../images/items/pot.svg';
import PotItem, { POT_ITEM_TYPE } from './potItem';

describe('PotItem', () => {
  it("has a type property set to 'PotItem'", () => {
    const potItem = new PotItem('pot');
    expect(potItem.type).toEqual(POT_ITEM_TYPE);
  });

  it('has an image property set to PotImage', () => {
    const potItem = new PotItem('pot');
    expect(potItem.image).toEqual(PotImage);
  });
});

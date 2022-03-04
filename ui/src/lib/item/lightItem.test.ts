import LightImage from '../../images/items/light.png';
import LightItem, { LIGHT_ITEM_TYPE } from './lightItem';

describe('LightItem', () => {
  it("has a type property set to 'PotItem'", () => {
    const potItem = new LightItem('light');
    expect(potItem.type).toEqual(LIGHT_ITEM_TYPE);
  });

  it('has an image property set to PotImage', () => {
    const potItem = new LightItem('pot');
    expect(potItem.image).toEqual(LightImage);
  });
});

import LightImage from '../../images/items/light.png';
import LightItem, { LIGHT_ITEM_TYPE } from './lightItem';

describe('LightItem', () => {
  it("has a type property set to 'PotItem'", () => {
    const lightItem = new LightItem('light');
    expect(lightItem.type).toEqual(LIGHT_ITEM_TYPE);
  });

  it('has an image property set to PotImage', () => {
    const lightItem = new LightItem('pot');
    expect(lightItem.image).toEqual(LightImage);
  });
});

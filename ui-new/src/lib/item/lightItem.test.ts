import LightImage from '../../assets/items/led_light.png';
import LightItem, { LIGHT_ITEM_TYPE } from './lightItem';

describe('LightItem', () => {
  it("has a type property set to 'PotItem'", () => {
    const lightItem = new LightItem({ name: 'light' });
    expect(lightItem.type).toEqual(LIGHT_ITEM_TYPE);
  });

  it('has an image property set to PotImage', () => {
    const lightItem = new LightItem({ name: 'pot' });
    expect(lightItem.image).toEqual(LightImage);
  });
});

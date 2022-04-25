import { v4 } from 'uuid';
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

  describe('modifierImages', () => {
    it('returns empty array when no modifiers', () => {
      const potItem = new PotItem('pot');
      const modifierImages = potItem.modifierImages;
      expect(modifierImages).toStrictEqual([]);
    });

    it('includes soil modifier if there is one soil modifier', () => {
      const potItem = new PotItem('pot', v4(), 0, 0, 100, 100, 100, '', 0, {
        soil: [v4()],
      });

      const modifierImages = potItem.modifierImages;
      expect(modifierImages).toStrictEqual(['soilMod.svg']);
    });

    it('includes soil modifier if there are multiple soil modifiers', () => {
      const potItem = new PotItem('pot', v4(), 0, 0, 100, 100, 100, '', 0, {
        soil: [v4(), v4()],
      });

      const modifierImages = potItem.modifierImages;
      expect(modifierImages).toStrictEqual(['soilMod.svg']);
    });
  });
});

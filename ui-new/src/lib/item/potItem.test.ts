import { v4 } from 'uuid';
import PotImage from '../../assets/items/pot.png';
import { initSoil } from './initModifiers';
import PotItem, { POT_ITEM_TYPE } from './potItem';

describe('PotItem', () => {
  it("has a type property set to 'PotItem'", () => {
    const potItem = new PotItem({ name: 'pot', amazonProducts: undefined });
    expect(potItem.type).toEqual(POT_ITEM_TYPE);
  });

  it('has an image property set to PotImage', () => {
    const potItem = new PotItem({ name: 'pot', amazonProducts: undefined });
    expect(potItem.image).toEqual(PotImage);
  });

  describe('modifierImages', () => {
    it('returns empty array when no modifiers', () => {
      const potItem = new PotItem({ name: 'pot', amazonProducts: undefined });
      const modifierImages = potItem.modifierImages;
      expect(modifierImages).toStrictEqual([]);
    });

    /**
     * skipped because we don't have modifier images right now
     */
    it.skip('includes soil modifier if there is one soil modifier', () => {
      const potItem = new PotItem({
        name: 'pot',
        id: v4(),
        x: 0,
        y: 0,
        width: 100,
        length: 100,
        height: 100,
        description: '',
        rotation: 0,
        modifiers: {
          Soil: initSoil(),
        },
        amazonProducts: undefined,
      });

      const { modifierImages } = potItem;
      expect(modifierImages).toStrictEqual(['soilMod.svg']);
    });

    /**
     * skipped because we don't have modifier images right now
     */
    // it.skip('includes soil modifier if there are multiple soil modifiers', () => {
    //   const potItem = new PotItem({
    //     name: 'pot',
    //     id: v4(),
    //     x: 0,
    //     y: 0,
    //     width: 100,
    //     length: 100,
    //     height: 100,
    //     description: '',
    //     rotation: 0,
    //     modifiers: {
    //       Soil: [v4(), v4()],
    //     },
    //     amazonProducts: undefined,
    //   });

    //   const modifierImages = potItem.modifierImages;
    //   expect(modifierImages).toStrictEqual(['soilMod.svg']);
    // });
  });
});

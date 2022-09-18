import CarbonFilterImage from '../../images/items/carbon_filter.png';
import CarbonFilterItem, { CARBON_FILTER_ITEM_TYPE } from './carbonFilterItem';

describe('LightItem', () => {
  it("has a type property set to 'PotItem'", () => {
    const carbonFilter = new CarbonFilterItem({ name: 'filter' });
    expect(carbonFilter.type).toEqual(CARBON_FILTER_ITEM_TYPE);
  });

  it('has an image property set to PotImage', () => {
    const carbonFilter = new CarbonFilterItem({ name: 'filter' });
    expect(carbonFilter.image).toEqual(CarbonFilterImage);
  });
});

import CarbonFilterImage from '../../assets/items/carbon_filter.png';
import CarbonFilterItem, { CARBON_FILTER_ITEM_TYPE } from './carbonFilterItem';

describe('CarbonFilterItem', () => {
  it("has a type property set to 'CarbonFilterItem'", () => {
    const carbonFilter = new CarbonFilterItem({ name: 'filter' });
    expect(carbonFilter.type).toEqual(CARBON_FILTER_ITEM_TYPE);
  });

  it('has an image property set to CarbonFilterImage', () => {
    const carbonFilter = new CarbonFilterItem({ name: 'filter' });
    expect(carbonFilter.image).toEqual(CarbonFilterImage);
  });
});

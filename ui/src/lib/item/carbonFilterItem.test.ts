import CarbonFilterImage from '../../images/items/carbonFilter/carbonFilter.svg';
import CarbonFilterItem, { CARBON_FILTER_ITEM_TYPE } from './carbonFilterItem';

describe('LightItem', () => {
  it("has a type property set to 'PotItem'", () => {
    const carbonFilter = new CarbonFilterItem('filter');
    expect(carbonFilter.type).toEqual(CARBON_FILTER_ITEM_TYPE);
  });

  it('has an image property set to PotImage', () => {
    const carbonFilter = new CarbonFilterItem('filter');
    expect(carbonFilter.image).toEqual(CarbonFilterImage);
  });
});

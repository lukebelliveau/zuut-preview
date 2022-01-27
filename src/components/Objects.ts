import MiscItem from '../lib/objects/miscItem';
import { IItemGroup } from './MenuSection';

const ObjectsMenu: IItemGroup[] = [
  {
    itemGroup: 'pots',
    items: [{ name: 'pot1' }, { name: 'pot2' }]
  },
  {
    itemGroup: 'climate',
    items: [{ name: 'climate obj' }]
  },
  {
    itemGroup: 'structure',
    items: [{ name: '24x24x36 tent' }]
  },
  {
    itemGroup: 'Misc',
    items: [
      new MiscItem('Nutrients')
    ]
  },
];

export default ObjectsMenu;
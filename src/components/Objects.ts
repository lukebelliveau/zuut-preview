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
      new MiscItem('Chip Bag Clips'),
      new MiscItem('CO2 System'),
      new MiscItem('Extension Cords'),
      new MiscItem('Eye Protection'),
      new MiscItem('Measuring Spoons'),
      new MiscItem('Nutrients'),
      new MiscItem('PH adjuster'),
      new MiscItem('PH test'),
      new MiscItem('Plant Twist Tie'),
      new MiscItem('Plant yoyos'),
      new MiscItem('Rope Ratchets'),
      new MiscItem('Surge Protectors'),
      new MiscItem('Syringes'),
      new MiscItem('Timer'),
      new MiscItem('Zip Ties'),
    ]
  },
];

export default ObjectsMenu;
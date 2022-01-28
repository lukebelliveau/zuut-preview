import Growspace from '../lib/items/growspace';
import MiscItem from '../lib/items/miscItem';
import { IItemGroup } from './MenuSection';

const ItemsLibrary: IItemGroup[] = [
  {
    itemGroup: 'pots',
    items: [new MiscItem('Pot 1'), new MiscItem('Pot 2')]
  },
  {
    itemGroup: 'climate',
    items: [new MiscItem('climate obj')]
  },
  {
    itemGroup: 'structure',
    items: [new Growspace('24x24x36 tent')]
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

export default ItemsLibrary;
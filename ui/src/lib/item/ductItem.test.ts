import { v4 } from 'uuid';
import ItemList from '../itemList';
import Plan from '../plan';
import Playground from '../playground';
import DuctItem from './ductItem';
import LightItem from './lightItem';
import { CollisionState } from './placeableItem';
import WindowItem from './windowitem';

describe('DuctItem', () => {
  describe('#updateCollisions', () => {
    it('has CONFLICTED collision state when colliding with a LightItem', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct = new DuctItem('duct', v4(), 0, 0, 1, 1, 1);
      const light = new LightItem('light', v4(), 0, 0, 1, 1, 1);
      const itemList = new ItemList();
      itemList.push(duct);
      itemList.push(light);

      duct.updateCollisions(itemList, playground);

      expect(duct.collisionState).toBe(CollisionState.CONFLICTED);
    });

    it('has CONNECTED collision state when connected to a window, oriented correctly', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct = new DuctItem('duct', v4(), 0, 3800);
      const window = new WindowItem('window', v4(), -30, 3600);
      const itemList = new ItemList();
      itemList.push(duct);
      itemList.push(window);

      duct.updateCollisions(itemList, playground);

      expect(duct.collisionState).toBe(CollisionState.CONNECTED);
    });
  });
});

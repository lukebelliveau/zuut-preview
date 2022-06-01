import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import Plan from '../plan';
import Playground from '../playground';
import DuctItem from './ductItem';
import Growspace from './growspace';
import LightItem from './lightItem';
import { CollisionState } from './placeableItem';
import WindowItem from './windowitem';

describe('DuctItem', () => {
  describe('#updateCollisions', () => {
    it('has CONFLICTED collision state when colliding with a LightItem', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct = new DuctItem(
        'duct',
        v4(),
        0,
        0,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const light = new LightItem(
        'light',
        v4(),
        0,
        0,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const itemList = [];
      itemList.push(duct);
      itemList.push(light);

      duct.updateCollisions(itemList, playground);

      expect(duct.collisionState).toBe(CollisionState.CONFLICTED);
    });

    it('has CONFLICTED collision state when it collides with nothing', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct = new DuctItem('duct', v4(), 0, 0, 1, 1, 1);
      const itemList = [];
      itemList.push(duct);

      duct.updateCollisions(itemList, playground);

      expect(duct.collisionState).toBe(CollisionState.CONFLICTED);
    });

    it('has CONNECTED collision state when connected to a window', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct = new DuctItem(
        'duct',
        v4(),
        0,
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const window = new WindowItem('window', v4(), -30, 3600);
      const itemList = [];
      itemList.push(duct);
      itemList.push(window);

      duct.updateCollisions(itemList, playground);

      expect(duct.collisionState).toBe(CollisionState.CONNECTED);
    });

    it('has CONNECTED collision state when connected to another window with CONNECTED collision state', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct1 = new DuctItem(
        'duct',
        'duct1',
        0,
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const duct2 = new DuctItem(
        'duct',
        'duct2',
        feetToMm(1),
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const window = new WindowItem('window', v4(), -30, 3600);
      const itemList = [];
      itemList.push(duct1);
      itemList.push(duct2);
      itemList.push(window);

      duct1.updateCollisions(itemList, playground);
      duct2.updateCollisions(itemList, playground);

      expect(duct1.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct2.collisionState).toBe(CollisionState.CONNECTED);
    });

    it('has CONNECTED collision state when by connected by 6 ducts to a window', () => {
      /**
       * Testing for >6 ducts because 6 is where rounding errors can cause this test to fail
       *
       * w = window
       * o = other ducts
       * x = duct under test
       * duct under test should have CONNECTED collision state
       *
       * w o o o o o o x
       */
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct0 = new DuctItem(
        'duct',
        'duct0',
        0,
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const duct1 = new DuctItem(
        'duct',
        'duct1',
        feetToMm(1),
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const duct2 = new DuctItem(
        'duct',
        'duct2',
        feetToMm(2),
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const duct3 = new DuctItem(
        'duct',
        'duct3',
        feetToMm(3),
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const duct4 = new DuctItem(
        'duct',
        'duct4',
        feetToMm(4),
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const duct5 = new DuctItem(
        'duct',
        'duct5',
        feetToMm(5),
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const duct6 = new DuctItem(
        'duct',
        'duct6',
        feetToMm(6),
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const window = new WindowItem('window', v4(), -30, 3600);
      const itemList = [];
      itemList.push(duct0);
      itemList.push(duct1);
      itemList.push(duct2);
      itemList.push(duct3);
      itemList.push(duct4);
      itemList.push(duct5);
      itemList.push(duct6);
      itemList.push(window);

      duct0.updateCollisions(itemList, playground);
      duct1.updateCollisions(itemList, playground);
      duct2.updateCollisions(itemList, playground);
      duct3.updateCollisions(itemList, playground);
      duct4.updateCollisions(itemList, playground);
      duct5.updateCollisions(itemList, playground);
      duct6.updateCollisions(itemList, playground);

      expect(duct0.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct1.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct2.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct3.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct4.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct5.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct6.collisionState).toBe(CollisionState.CONNECTED);
    });

    it('has CONNECTED collision state when attached to the bottom of a horizontal line of ducts', () => {
      /**
       * w = window
       * o = other ducts
       * x = duct under test
       * duct under test should have CONNECTED collision state
       *
       * w o o
       *     x
       */

      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct0 = new DuctItem(
        'duct',
        'duct0',
        0,
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      const duct1 = new DuctItem(
        'duct',
        'duct1',
        feetToMm(1),
        3800,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );
      // duct2 placed directly under duct1
      const duct2 = new DuctItem(
        'duct',
        'duct2',
        feetToMm(1),
        3800 + feetToMm(1),
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      );

      const window = new WindowItem('window', v4(), -30, 3600);
      const itemList = [];
      itemList.push(duct0);
      itemList.push(duct1);
      itemList.push(duct2);

      itemList.push(window);

      duct0.updateCollisions(itemList, playground);
      duct1.updateCollisions(itemList, playground);
      duct2.updateCollisions(itemList, playground);

      expect(duct0.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct1.collisionState).toBe(CollisionState.CONNECTED);
      expect(duct2.collisionState).toBe(CollisionState.CONNECTED);
    });
  });
});

describe('#collisionStateBetween', () => {
  it('does not conflict with growspace', () => {
    const growspace = new Growspace('', '1', 1001, 1001, 1001, 1001);
    const duct = new DuctItem('', '2', 950, 950, 2000, 2000);

    expect(duct.collisionStateBetween(duct, growspace)).toBe(
      CollisionState.NEUTRAL
    );
  });
});

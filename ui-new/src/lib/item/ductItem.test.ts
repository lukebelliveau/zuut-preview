import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import Plan from '../plan';
import Playground from '../playground';
import DuctItem from './ductItem';
import Tent from './tentItem';
import LightItem from './lightItem';
import { CollisionState } from './placeableItem';
import WindowItem from './windowitem';

describe('DuctItem', () => {
  describe('#updateCollisions', () => {
    it('has CONFLICTED collision state when colliding with a LightItem', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct = new DuctItem({
        name: 'duct',
        id: v4(),
        x: 0,
        y: 0,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const light = new LightItem({
        name: 'light',
        id: v4(),
        x: 0,
        y: 0,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const itemList = [];
      itemList.push(duct);
      itemList.push(light);

      duct.updateCollisions(itemList, playground);

      expect(duct.collisionState).toBe(CollisionState.CONFLICTED);
    });

    it('has CONFLICTED collision state when it collides with nothing', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct = new DuctItem({
        name: 'duct',
        id: v4(),
        x: 0,
        y: 0,
        width: 1,
        length: 1,
        height: 1,
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const itemList = [];
      itemList.push(duct);

      duct.updateCollisions(itemList, playground);

      expect(duct.collisionState).toBe(CollisionState.CONFLICTED);
    });

    it('has CONNECTED collision state when connected to a window', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct = new DuctItem({
        name: 'duct',
        id: v4(),
        x: 0,
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const window = new WindowItem({
        name: 'window',
        id: v4(),
        x: -30,
        y: 3600,
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const itemList = [];
      itemList.push(duct);
      itemList.push(window);

      duct.updateCollisions(itemList, playground);

      expect(duct.collisionState).toBe(CollisionState.CONNECTED);
    });

    it('has CONNECTED collision state when connected to another window with CONNECTED collision state', () => {
      const plan = new Plan('square', 1_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const duct1 = new DuctItem({
        name: 'duct',
        id: 'duct1',
        x: 0,
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const duct2 = new DuctItem({
        name: 'duct',
        id: 'duct2',
        x: feetToMm(1),
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const window = new WindowItem({
        name: 'window',
        id: v4(),
        x: -30,
        y: 3600,
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
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
      const duct0 = new DuctItem({
        name: 'duct',
        id: 'duct0',
        x: 0,
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const duct1 = new DuctItem({
        name: 'duct',
        id: 'duct1',
        x: feetToMm(1),
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const duct2 = new DuctItem({
        name: 'duct',
        id: 'duct2',
        x: feetToMm(2),
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const duct3 = new DuctItem({
        name: 'duct',
        id: 'duct3',
        x: feetToMm(3),
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const duct4 = new DuctItem({
        name: 'duct',
        id: 'duct4',
        x: feetToMm(4),
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const duct5 = new DuctItem({
        name: 'duct',
        id: 'duct5',
        x: feetToMm(5),
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const duct6 = new DuctItem({
        name: 'duct',
        id: 'duct6',
        x: feetToMm(6),
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const window = new WindowItem({
        name: 'window',
        id: v4(),
        x: -30,
        y: 3600,
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
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
      const duct0 = new DuctItem({
        name: 'duct',
        id: 'duct0',
        x: 0,
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      const duct1 = new DuctItem({
        name: 'duct',
        id: 'duct1',
        x: feetToMm(1),
        y: 3800,
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      // duct2 placed directly under duct1
      const duct2 = new DuctItem({
        name: 'duct',
        id: 'duct2',
        x: feetToMm(1),
        y: 3800 + feetToMm(1),
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
        amazonProducts: [],
        selectedAmazonASIN: '',
      });

      const window = new WindowItem({
        name: 'window',
        id: v4(),
        x: -30,
        y: 3600,
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
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
    const growspace = new Tent({
      name: '',
      id: '1',
      x: 1001,
      y: 1001,
      width: 1001,
      length: 1001,
      amazonProducts: [],
      selectedAmazonASIN: '',
    });
    const duct = new DuctItem({
      name: '',
      id: '2',
      x: 950,
      y: 950,
      width: 2000,
      length: 2000,
      amazonProducts: [],
      selectedAmazonASIN: '',
    });

    expect(duct.collisionStateBetween(duct, growspace)).toBe(CollisionState.NEUTRAL);
  });
});

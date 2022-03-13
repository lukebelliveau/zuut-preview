import { CEILING_GROWSPACE_ITEM_TYPE, isCeilingGrowspaceItem } from './ceilingGrowspaceItem';
import { GROWSPACE_TYPE, isGrowspace } from './growspace';
import { GROWSPACE_ITEM_TYPE, isGrowspaceItem } from './growspaceItem';
import ItemGraphqlAdapter from './itemGraphqlAdapter';
import { isLightItem, LIGHT_ITEM_TYPE } from './lightItem';
import { isMiscItem, MISC_ITEM_TYPE } from './miscItem';
import { isPotItem, POT_ITEM_TYPE } from './potItem';
import { isRoomItem, ROOM_ITEM_TYPE } from './roomItem';
import { isWallItem, WALL_ITEM_TYPE } from './wallItem';

describe('ItemGraphqlAdapter', () => {
  describe('#graphqlToItem', () => {
    it('hydrates a Growspace', () => {
      expect(isGrowspace(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: GROWSPACE_TYPE,
      }))).toBeTruthy();
    });
    it('hydrates a GrowspaceItem', () => {
      expect(isGrowspaceItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: GROWSPACE_ITEM_TYPE,
      }))).toBeTruthy();
    });
    it('hydrates a LightItem', () => {
      expect(isLightItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: LIGHT_ITEM_TYPE,
      }))).toBeTruthy();
    });
    it('hydrates a CeilingGrowspaceItem', () => {
      expect(isCeilingGrowspaceItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: CEILING_GROWSPACE_ITEM_TYPE,
      }))).toBeTruthy();
    });
    it('hydrates a MiscItem', () => {
      expect(isMiscItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: MISC_ITEM_TYPE,
      }))).toBeTruthy();
    });
    it('hydrates a RoomItem', () => {
      expect(isRoomItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: ROOM_ITEM_TYPE,
      }))).toBeTruthy();
    });
    it('hydrates a WallItem', () => {
      expect(isWallItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: WALL_ITEM_TYPE,
      }))).toBeTruthy();
    });
    it('hydrates a PotItem', () => {
      expect(isPotItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: POT_ITEM_TYPE,
      }))).toBeTruthy();
    });
  });
});
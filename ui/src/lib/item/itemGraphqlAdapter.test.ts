import { isGrowspace, isGrowspaceItem, isMiscItem, isPotItem, isRoomItem, isWallItem } from '../item';
import ItemGraphqlAdapter from './itemGraphqlAdapter';

describe('ItemGraphqlAdapter', () => {
  describe('#graphqlToItem', () => {
    it('hydrates a Growspace', () => {
      expect(isGrowspace(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: 'Growspace'
      }))).toBeTruthy();
    });
    it('hydrates a GrowspaceItem', () => {
      expect(isGrowspaceItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: 'GrowspaceItem'
      }))).toBeTruthy();
    });
    it('hydrates a MiscItem', () => {
      expect(isMiscItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: 'MiscItem'
      }))).toBeTruthy();
    });
    it('hydrates a RoomItem', () => {
      expect(isRoomItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: 'RoomItem'
      }))).toBeTruthy();
    });
    it('hydrates a WallItem', () => {
      expect(isWallItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: 'WallItem'
      }))).toBeTruthy();
    });
    it('hydrates a PotItem', () => {
      expect(isPotItem(ItemGraphqlAdapter.graphqlToItem({
        id: '123',
        name: 'foo',
        type: 'PotItem'
      }))).toBeTruthy();
    });
  });
});
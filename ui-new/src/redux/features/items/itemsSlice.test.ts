// import { v4 } from 'uuid';
// import getItemsOfType from '../../../../tests/getItemsOfType';
// import { createAppStore } from '../../store';
// import ItemReduxAdapter from '../../../lib/item/itemReduxAdapter';
// import MiscItem, { MISC_ITEM_TYPE } from '../../../lib/item/miscItem';
// import ModifierItem from '../../../lib/item/modifierItem';
// import { CollisionState, Modifier } from '../../../lib/item/placeableItem';
// import PotItem, { POT_ITEM_TYPE } from '../../../lib/item/potItem';
// import Plan from '../../../lib/plan';
// import PlanReduxAdapter from '../../../lib/plan/planReduxAdapter';
// import { create } from '../plans/planSlice';
// import { setPlan } from '../playgrounds/playgroundSlice';
// import { setUser } from '../users/userSlice';
// import {
//   addItem,
//   decrementModifier,
//   dropItem,
//   incrementModifier,
//   removeItem,
//   removeItems,
//   rotate,
// } from './itemsSlice';
// import { ItemState } from './itemState';
// import { initSoil } from 'src/lib/item/initModifiers';

// const setupStore = () => {
//   const store = createAppStore();
//   const plan = new Plan();
//   const planState = PlanReduxAdapter.planToState(plan);
//   store.dispatch(create(planState));
//   store.dispatch(setPlan(plan.id));
//   store.dispatch(setUser('jwt'));

//   return store;
// };

// const addRemoveModifier: Modifier = {
//   ids: [],
//   name: 'Soil',
//   recordId: 'recordId',
// };

// describe('items/addItem', () => {
//   it('adds an item to state', () => {
//     const store = setupStore();

//     const item: ItemState = {
//       id: v4(),
//       type: POT_ITEM_TYPE,
//       name: 'Pot',
//       amazonProducts: undefined,
//     };

//     store.dispatch(addItem(item));

//     expect(store.getState().items.present.ids.length).toBe(1);
//     expect(store.getState().items.present.ids).toStrictEqual([item.id]);
//   });
// });

// describe('items/dropItem', () => {
//   it('updates an item with changes', () => {
//     const store = setupStore();

//     const id = v4();
//     const item: ItemState = {
//       id,
//       type: POT_ITEM_TYPE,
//       name: 'Pot',
//       x: 0,
//       y: 0,
//       width: 0,
//       length: 0,
//       height: 0,
//       collisionState: CollisionState.NEUTRAL,
//       rotation: 0,
//       modifiers: {},
//       amazonProducts: undefined,
//     };
//     const updatedItem: ItemState = {
//       id,
//       type: POT_ITEM_TYPE,
//       name: 'Pot',
//       x: 10,
//       y: 10,
//       width: 10,
//       length: 10,
//       height: 10,
//       collisionState: CollisionState.CONNECTED,
//       rotation: 10,
//       modifiers: { Soil: initSoil() },
//       amazonProducts: undefined,
//     };

//     store.dispatch(addItem(item));
//     store.dispatch(dropItem(updatedItem));

//     expect(store.getState().items.present.ids.length).toBe(1);
//     expect(store.getState().items.present.entities[id]).toStrictEqual(updatedItem);
//   });
// });

// describe('items/removeItem', () => {
//   it('removes an item from state', () => {
//     const store = setupStore();

//     const id = v4();
//     const item: ItemState = {
//       id,
//       type: POT_ITEM_TYPE,
//       name: 'Pot',
//       amazonProducts: undefined,
//     };

//     store.dispatch(addItem(item));
//     expect(store.getState().items.present.ids.length).toBe(1);
//     store.dispatch(removeItem(id));

//     expect(store.getState().items.present.ids.length).toBe(0);
//   });

//   it('removes all modifier items attached to parent item being deleted', () => {
//     const store = setupStore();

//     // add modifier items to state
//     // normally done by `items/incrementModifer`, but we're not testing that here
//     const mod1 = new ModifierItem({ name: 'Soil' });
//     const mod2 = new ModifierItem({ name: 'Soil' });
//     const mod3 = new ModifierItem({ name: 'Soil' });
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(mod1)));
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(mod2)));
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(mod3)));

//     // add parent item with modifiers to state
//     const item = new PotItem({ name: 'Pot' });
//     item.addModifier(mod1);
//     item.addModifier(mod2);
//     item.addModifier(mod3);
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(item)));

//     // item with no parent, that should remain after deleting parent
//     store.dispatch(
//       addItem({
//         id: v4(),
//         type: MISC_ITEM_TYPE,
//         name: 'miscItem',
//         amazonProducts: undefined,
//       })
//     );
//     store.dispatch(removeItem(item.id));

//     expect(store.getState().items.present.ids.length).toBe(1);
//   });
// });

// describe('items/removeItems', () => {
//   it('removes multiple items', () => {
//     const store = setupStore();

//     // add modifier items to state
//     // normally done by `items/incrementModifer`, but we're not testing that here
//     const item1 = new MiscItem({ name: 'item1' });
//     const item2 = new MiscItem({ name: 'item2' });
//     const item3 = new MiscItem({ name: 'item3' });
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(item1)));
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(item2)));
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(item3)));

//     store.dispatch(removeItems([item1.id, item3.id]));

//     expect(store.getState().items.present.ids.length).toBe(1);
//     expect(store.getState().items.present.ids).toStrictEqual([item2.id]);
//   });
// });

// describe('items/rotate', () => {
//   it('rotates an item', () => {
//     const store = setupStore();

//     const item = new PotItem({ name: 'Pot' });
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(item)));

//     store.dispatch(rotate(item.id));

//     expect(store.getState().items.present.entities[item.id]?.rotation).toBe(90);
//   });
// });

// describe('items/incrementModifier', () => {
//   it('creates a modifier item and adds to the parent item', () => {
//     const store = setupStore();

//     const item = new PotItem({ name: 'Pot' });
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(item)));

//     store.dispatch(
//       incrementModifier({
//         itemId: item.id,
//         modifier: addRemoveModifier,
//       })
//     );
//     // pot and soil
//     expect(store.getState().items.present.ids.length).toBe(2);
//     let potItem = getItemsOfType(POT_ITEM_TYPE, store)[0];
//     expect(potItem?.modifiers?.Soil.ids.length).toBe(1);

//     store.dispatch(
//       incrementModifier({
//         itemId: item.id,
//         modifier: addRemoveModifier,
//       })
//     );
//     // pot and soil (x2)
//     expect(store.getState().items.present.ids.length).toBe(3);
//     potItem = getItemsOfType(POT_ITEM_TYPE, store)[0];
//     expect(potItem?.modifiers?.Soil.ids.length).toBe(2);
//   });
// });

// describe('items/decrementModifier', () => {
//   it('removes one modifier', () => {
//     const store = setupStore();
//     const item = new PotItem({ name: 'Pot' });
//     store.dispatch(addItem(ItemReduxAdapter.itemToState(item)));
//     store.dispatch(
//       incrementModifier({
//         itemId: item.id,
//         modifier: addRemoveModifier,
//       })
//     );
//     // pot and soil
//     expect(store.getState().items.present.ids.length).toBe(2);
//     let potItem = getItemsOfType(POT_ITEM_TYPE, store)[0];
//     expect(potItem?.modifiers?.Soil.ids.length).toBe(1);
//     store.dispatch(
//       incrementModifier({
//         itemId: item.id,
//         modifier: addRemoveModifier,
//       })
//     );
//     // pot and soil (x2)
//     expect(store.getState().items.present.ids.length).toBe(3);
//     potItem = getItemsOfType(POT_ITEM_TYPE, store)[0];
//     expect(potItem?.modifiers?.Soil.ids.length).toBe(2);

//     store.dispatch(decrementModifier({ itemId: item.id, modifier: addRemoveModifier }));
//     expect(store.getState().items.present.ids.length).toBe(2);
//     potItem = getItemsOfType(POT_ITEM_TYPE, store)[0];
//     expect(potItem?.modifiers?.Soil.ids.length).toBe(1);

//     store.dispatch(decrementModifier({ itemId: item.id, modifier: addRemoveModifier }));
//     expect(store.getState().items.present.ids.length).toBe(1);
//     potItem = getItemsOfType(POT_ITEM_TYPE, store)[0];
//     expect(potItem?.modifiers?.Soil.ids.length).toBe(0);
//   });
// });

export {};

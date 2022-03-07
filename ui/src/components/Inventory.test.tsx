import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { createAppStore } from '../app/store';
import { addOne } from '../features/items/itemsSlice';
import GrowspaceItem from '../lib/item/growspaceItem';
import ItemReduxAdapter from '../lib/item/itemReduxAdapter';
import Inventory from './Inventory';

import { renderWithContext } from '../../tests/renderWithContext';

describe('Inventory', () => {
  it('toggles item selection with keyboard and mouse', async () => {
    const store = createAppStore();
    const item = new GrowspaceItem('testItem');
    store.dispatch(addOne(ItemReduxAdapter.itemToState(item)));

    renderWithContext(<Inventory />, store);

    const itemElement = screen.getByText('testItem');
    expect(itemElement.className.includes('selected')).toBe(false);

    fireEvent.keyDown(itemElement, { key: 'Enter' });
    expect(itemElement.className.includes('selected')).toBe(true);
    fireEvent.keyDown(itemElement, { key: 'Enter' });
    expect(itemElement.className.includes('selected')).toBe(false);

    fireEvent.click(itemElement);
    expect(itemElement.className.includes('selected')).toBe(true);
    fireEvent.click(itemElement);
    expect(itemElement.className.includes('selected')).toBe(false);
  });

  it('deletes an item with Delete key', async () => {
    const store = createAppStore();
    const item = new GrowspaceItem('testItem');
    store.dispatch(addOne(ItemReduxAdapter.itemToState(item)));

    renderWithContext(<Inventory />, store);

    const testItem = screen.getByText('testItem');

    // select item
    fireEvent.keyDown(testItem, { key: 'Enter' });
    await waitFor(() => store.getState().interactions.selected === item.id);
    fireEvent.keyDown(testItem, { key: 'Delete' });

    await waitFor(() =>
      expect(store.getState().items.present.ids.length).toBe(0)
    );
  });

  it('deletes an item with Backspace key', async () => {
    const store = createAppStore();
    const item = new GrowspaceItem('testItem');
    store.dispatch(addOne(ItemReduxAdapter.itemToState(item)));

    renderWithContext(<Inventory />, store);

    const testItem = screen.getByText('testItem');

    // select item
    fireEvent.keyDown(testItem, { key: 'Enter' });
    // delete item
    fireEvent.keyDown(testItem, { key: 'Backspace' });

    await waitFor(() =>
      expect(store.getState().items.present.ids.length).toBe(0)
    );
  });
});

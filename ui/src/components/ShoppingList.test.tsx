import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { createAppStore } from '../app/store';
import { addOne } from '../features/items/itemsSlice';
import GrowspaceItem from '../lib/item/growspaceItem';
import ItemReduxAdapter from '../lib/item/itemReduxAdapter';
import ShoppingList from './ShoppingList';

import { renderWithContext } from '../../tests/renderWithContext';

describe('ShoppingList', () => {
  it('toggles item selection with keyboard and mouse', async () => {
    const store = createAppStore();
    const item = new GrowspaceItem('testItem');
    store.dispatch(addOne(ItemReduxAdapter.itemToState(item)));

    renderWithContext(<ShoppingList />, store);

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
});

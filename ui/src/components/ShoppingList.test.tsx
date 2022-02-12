import { EnhancedStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { Provider } from 'react-redux';
import { createAppStore } from '../app/store';
import { addOne } from '../features/items/itemsSlice';
import GrowspaceItem from '../lib/item/growspaceItem';
import ItemReduxAdapter from '../lib/item/itemReduxAdapter';
import ShoppingList from './ShoppingList';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

const renderWithContext = (children: JSX.Element, store?: EnhancedStore) => {
  const testStore = store ? store : createAppStore();

  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={testStore}>{children}</Provider>
    </DndProvider>
  );
};

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { renderWithContext } from '../../../tests/renderWithContext';
import { createAppStore } from '../../app/store';
import { select } from '../../features/interactions/interactionsSlice';
import { addOne } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import PotItem from '../../lib/item/potItem';
import ControlPanel from './ControlPanel';

describe('ControlPanel', () => {
  it('does not show if no item selected', () => {
    const store = createAppStore();

    renderWithContext(<ControlPanel />, store);

    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });

  it('shows if there is an item selected', () => {
    const store = createAppStore();
    const item = new PotItem('2x2 Pot');
    store.dispatch(addOne(ItemReduxAdapter.itemToState(item)));
    store.dispatch(select(item.id));

    renderWithContext(<ControlPanel />, store);

    screen.getByText('Description');
  });

  it('deletes an item', () => {
    const store = createAppStore();
    const item = new PotItem('2x2 Pot');
    store.dispatch(addOne(ItemReduxAdapter.itemToState(item)));
    store.dispatch(select(item.id));

    renderWithContext(<ControlPanel />, store);

    const deleteButton = screen.getByLabelText('delete item');
    fireEvent.click(deleteButton);

    expect(store.getState().interactions.selected).toBeUndefined();
    expect(store.getState().items.present.ids).toHaveLength(0);
  });
});

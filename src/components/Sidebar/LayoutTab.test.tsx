import { EnhancedStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from '../../app/store';
import { itemsSelectors } from '../../features/items/itemsSelectors';
import LayoutTab from './LayoutTab';

describe('LayoutTab', () => {
  it('displays a Window item', () => {
    renderWithContext(<LayoutTab />);
    screen.getByText('Window');
  });

  it('places a window item', () => {
    const store = createAppStore();

    renderWithContext(<LayoutTab />, store);

    const windowMenuItem = screen.getByText('Window');
    fireEvent.click(windowMenuItem);

    const items = itemsSelectors.selectAll(store.getState());

    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Window');
  });
});

const renderWithContext = (children: JSX.Element, store?: EnhancedStore) => {
  const testStore = store ? store : createAppStore();

  return render(<Provider store={testStore}>{children}</Provider>);
};

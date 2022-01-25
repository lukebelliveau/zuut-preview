import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Home from './Home';
expect.extend(toHaveNoViolations);

test('is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
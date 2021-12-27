import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
expect.extend(toHaveNoViolations);

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
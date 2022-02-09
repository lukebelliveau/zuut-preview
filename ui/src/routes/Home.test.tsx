import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Home from './Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
expect.extend(toHaveNoViolations);

test('is accessible', async () => {
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
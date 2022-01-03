import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import AccessDenied from './routes/AccessDenied';
import Home from './routes/Home';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Playground from './routes/Playground';
import Workplace from './routes/Workplace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/playground"
          element={
            <RequireAuth>
              <Playground />
            </RequireAuth>
          }
        />
        <Route
          path="/workplace"
          element={
            <RequireAuth>
              <Workplace />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

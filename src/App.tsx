import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import AccessDenied from './routes/AccessDenied';
import Home from './routes/Home';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import NewPlayground, { new_playground_path } from './routes/playgrounds/NewPlayground';
import ShowPlayground, { playground_path } from './routes/playgrounds/ShowPlayground';
import Workplace from './routes/Workplace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={new_playground_path()}
          element={
            <RequireAuth>
              <NewPlayground />
            </RequireAuth>
          }
        />
        <Route
          path={playground_path()}
          element={
            <RequireAuth>
              <ShowPlayground />
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

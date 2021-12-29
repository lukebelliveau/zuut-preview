import { useAuth0 } from '@auth0/auth0-react';
import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (process.env.REACT_APP_DISABLE_AUTH) {
    return <Fragment>{children}</Fragment>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated === true ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;

import { useAuth0 } from '@auth0/auth0-react';
import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (process.env.REACT_APP_DISABLE_AUTH) {
    return <Fragment>{children}</Fragment>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.debug('Error authenticating: ', error);
    return <Navigate to="/access-denied" />;
  }

  return isAuthenticated === true ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;

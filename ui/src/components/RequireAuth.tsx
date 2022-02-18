import { useAuth0 } from '@auth0/auth0-react';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser } from '../features/users/userSlice';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, error, loginWithRedirect, getIdTokenClaims } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then(jwt => {
        dispatch(setUser(jwt));
      });
    }
  }, [dispatch, isAuthenticated, getIdTokenClaims]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.debug('Error authenticating: ', error);
    return <Navigate to="/access-denied" />;
  }

  if (!isAuthenticated) loginWithRedirect();

  return <Fragment>{children}</Fragment>;
};

export default RequireAuth;

import { useAuth0 } from '@auth0/auth0-react';
import { push } from 'connected-react-router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/users/userSlice';
import Loading from './Loading';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, error, loginWithRedirect, getIdTokenClaims } = useAuth0();
  const dispatch = useDispatch();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !userLoaded) {
      setUserLoaded(true);
      getIdTokenClaims().then(jwt => {
        dispatch(setUser(jwt.__raw));
      });
    }
  }, [dispatch, isAuthenticated, userLoaded, setUserLoaded, getIdTokenClaims]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.debug('Error authenticating: ', error);
    dispatch(push('/access-denied'));
  }

  if (!isAuthenticated) loginWithRedirect({
    redirectUri: window.location.href
  });

  return <Fragment>{children}</Fragment>;
};

export default RequireAuth;

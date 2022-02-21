import { useAuth0 } from '@auth0/auth0-react';
import { playground_path } from '../routes/playgrounds/ShowPlayground';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="warning" onClick={() => loginWithRedirect({
      redirectUri: `${window.location.origin}${playground_path()}`
    })}>
      Log in
    </button>
  );
};

export default LoginButton;

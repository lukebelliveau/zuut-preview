import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log in</button>;
};

const Login = () => {
  return <LoginButton />;
};

export default Login;

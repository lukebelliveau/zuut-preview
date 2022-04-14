import LogoutButton from '../components/LogoutButton';

const SessionExpired = () => {
  return (
    <div>
      <h1>Session Expired</h1>
      <p>This can usually be fixed by logging out and back in.</p>
      <p>Please press the button below to log out.</p>
      <LogoutButton />
    </div>
  );
};

export default SessionExpired;

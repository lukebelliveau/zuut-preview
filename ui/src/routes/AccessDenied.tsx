import LogoutButton from '../components/LogoutButton';

const AccessDenied = () => {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <LogoutButton />
    </div>
  );
};

export default AccessDenied;

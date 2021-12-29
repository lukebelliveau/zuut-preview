import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';

export default function Workplace() {
  const { user } = useAuth0();

  return (
    <Layout header="Workplace">
      <p>Hello, {user?.name}</p>
      <p>You don't have any saved grows yet</p>
    </Layout>
  );
}

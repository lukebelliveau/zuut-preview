import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';

export default function Playground() {
  const { user } = useAuth0();

  return (
    <Layout header="Playground">
      <div id="sandbox">
      </div>
    </Layout>
  );
}

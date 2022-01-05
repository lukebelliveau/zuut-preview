import React from 'react';
import Layout from '../../components/Layout';
import { selectPlaygroundPlan } from '../../features/playgroundPlan/playgroundPlanSelector';


export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const plan = selectPlaygroundPlan();
  if (!plan) throw new Error('No plan found');
  const header = <span>Playground / <strong>{plan.name}</strong></span>;

  return (
    <Layout header={header}>
      <div id="sandbox">
      </div>
    </Layout>
  );
}

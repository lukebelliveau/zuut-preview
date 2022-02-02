import React, { createRef } from 'react';
import { Helmet } from 'react-helmet';
import { FullPage, Slide } from 'react-full-page';

import EnterName from './NewPlayground/EnterName';
import EnterDimensions from './NewPlayground/EnterDimensions';
import { useSelectDefaultPlan } from '../../features/plans/planSelectors';
import { sandboxPlan } from '../../App';
import { PlanState } from '../../features/plans/planState';

export const new_playground_path = () => '/playgrounds/new';

export default function NewPlayground() {
  let fullPageRef = createRef<any>();

  // hacking around typescript, not meant to stay
  let plan: PlanState | undefined = useSelectDefaultPlan();
  let definitelyAPlan: PlanState;
  if (!plan) {
    console.error('NO PLAN!!!');
    definitelyAPlan = sandboxPlan;
  } else {
    definitelyAPlan = plan;
  }

  function nextPage() {
    fullPageRef.current.scrollNext();
  }

  return (
    <>
      <Helmet>
        <title>Zuut - Create a new grow</title>
      </Helmet>
      <FullPage ref={fullPageRef}>
        <Slide>
          <EnterName nextPage={nextPage} plan={definitelyAPlan} />
        </Slide>
        <Slide>
          <EnterDimensions plan={definitelyAPlan} />
        </Slide>
      </FullPage>
    </>
  );
}

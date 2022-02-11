import { useEffect, useState, createRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FullPage, Slide } from 'react-full-page';
import { useDispatch } from 'react-redux';

import EnterName from './NewPlayground/EnterName';
import EnterDimensions from './NewPlayground/EnterDimensions';
import { createPlan } from '../../features/plans/planSlice';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import { update } from '../../features/playgrounds/playgroundSlice';
import Plan from '../../lib/plan';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';

export const new_playground_path = () => '/playgrounds/new';

export default function NewPlayground() {
  let fullPageRef = createRef<any>();
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();
  const playgroundState = useSelectPlayground();

  useEffect(() => {
    if (firstLoad) {
      const plan = Plan.sandbox();
      if (!process.env.REACT_APP_TEST_PLAYGROUND) {
        dispatch(createPlan(PlanReduxAdapter.planToState(plan)));
        dispatch(update({ ...playgroundState, planId: plan.id }));
      }
      setFirstLoad(false);
    }
  }, [playgroundState, dispatch, firstLoad]);

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
          <EnterName nextPage={nextPage} />
        </Slide>
        <Slide>
          <EnterDimensions />
        </Slide>
      </FullPage>
    </>
  );
}

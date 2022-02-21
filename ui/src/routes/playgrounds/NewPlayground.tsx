import { createRef } from 'react';
import { FullPage, Slide } from 'react-full-page';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import EnterName from './NewPlayground/EnterName';
import EnterDimensions from './NewPlayground/EnterDimensions';
import { useBuildPlayground } from '../../app/builderHooks';
import { useJwt } from '../../features/users/userSelector';
import Loading from '../../components/Loading';
import { setupInitialPLayground } from '../../features/playgrounds/playgroundSlice';

export const new_playground_path = () => '/playgrounds/new';

export default function NewPlayground() {
  let fullPageRef = createRef<any>();
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const jwt = useJwt();

  if (!jwt) {
    return <Loading />;
  } else if (!playground.plan) {
    dispatch(setupInitialPLayground(jwt));
    return <Loading />;
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
          <EnterName nextPage={nextPage} />
        </Slide>
        <Slide>
          <EnterDimensions />
        </Slide>
      </FullPage>
    </>
  );
}

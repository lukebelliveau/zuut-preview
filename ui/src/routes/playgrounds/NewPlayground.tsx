import { useAuth0 } from '@auth0/auth0-react';
import { push } from 'connected-react-router';
import { createRef, useEffect, useState } from 'react';
import { FullPage, Slide } from 'react-full-page';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import EnterName from './NewPlayground/EnterName';
import EnterDimensions from './NewPlayground/EnterDimensions';
import { useJwt } from '../../features/users/userSelector';
import Loading from '../../components/Loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createPlan } from '../../features/plans/planSlice';
import { feetToMm } from '../../lib/conversions';
import { playground_path } from './ShowPlayground';
import { loadCurrentPlaygroundIfPresent } from '../../features/playgrounds/playgroundSlice';

export const new_playground_path = () => '/playgrounds/new';

export default function NewPlayground() {
  let fullPageRef = createRef<any>();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();
  const { register, handleSubmit } = useForm<FormParams>();
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(loadCurrentPlaygroundIfPresent(true));
      setIsFirstLoad(true);
    }
  }, [isFirstLoad, setIsFirstLoad, dispatch]);

  type FormParams = {
    name: string;
    width: number;
    length: number;
  };

  const onSubmit: SubmitHandler<FormParams> = (data) => {
    dispatch(createPlan({
      name: data.name,
      width: feetToMm(data.width),
      length: feetToMm(data.length),
    }));

    push(playground_path());
  };

  if (!isAuthenticated) {
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
          <EnterName name={register('name')} nextPage={nextPage} />
        </Slide>
        <Slide>
          <EnterDimensions
            width={register('width', { required: true })}
            length={register('length', { required: true })}
            onSubmit={handleSubmit(onSubmit)}
          />
        </Slide>
      </FullPage>
    </>
  );
}

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
import { createPlan, deleteAllPlans } from '../../features/plans/planSlice';
import { feetToMm } from '../../lib/conversions';
import { playground_path } from './ShowPlayground';
import { loadCurrentPlaygroundIfPresent } from '../../features/playgrounds/playgroundSlice';
import useQuery from '../../app/useQuery';
import { removeAll, removeAllItems } from '../../features/items/itemsSlice';
import { ActionCreators } from 'redux-undo';

export const new_playground_path = () => '/playgrounds/new';
export const reset_playground_path = () =>
  new_playground_path() + '?reset-playground=true';

export default function NewPlayground() {
  let fullPageRef = createRef<any>();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();
  const { register, handleSubmit } = useForm<FormParams>();
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  let query = useQuery();

  const resetPlayground = query.get('reset-playground');
  const jwt = useJwt();

  useEffect(() => {
    if (!isFirstLoad && !resetPlayground) {
      dispatch(loadCurrentPlaygroundIfPresent(true));
      setIsFirstLoad(true);
    } else if (resetPlayground && jwt) {
      dispatch(deleteAllPlans(true));
      dispatch(removeAllItems(true));
      dispatch(ActionCreators.clearHistory());
    }
  }, [isFirstLoad, setIsFirstLoad, dispatch, resetPlayground, jwt]);

  type FormParams = {
    name: string;
    width: number;
    length: number;
  };

  const onSubmit: SubmitHandler<FormParams> = (data) => {
    dispatch(
      createPlan({
        name: data.name,
        width: feetToMm(data.width),
        length: feetToMm(data.length),
      })
    );

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

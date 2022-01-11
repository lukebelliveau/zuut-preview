import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { update } from '../../features/plans/planSlice';
import Plan from '../../lib/plan';
import { planStateBuilder } from '../../features/plans/planReduxAdapter';
import { selectById as selectPlanById } from '../../features/plans/planSelectors';
import { selectPlayground } from '../../features/playgrounds/playgroundSelector';
import { store } from '../../app/store';
import Playground from '../../lib/playground';
import PillInput from '../../components/PillInput';
import { playground_path } from './ShowPlayground';

export const new_playground_path = () => '/playgrounds/new';

type EnterDimensionsProps = {
  nextPage: () => void;
}

export default function EnterDimensions(props: EnterDimensionsProps) {
  const [showCreateLayoutPopup, setShowCreateLayoutPopup] = useState(false);

  const playground = useSelector(selectPlayground);
  const planId = playground.planId;
  if (!planId) return <></>;

  const plan = selectPlanById(store.getState(), planId);
  if (!plan) return <></>;
  

  function togglePopup() {
    setShowCreateLayoutPopup(!showCreateLayoutPopup);
  }

  return (<>
    <h1>Choose your layout.</h1>
    <button onClick={togglePopup}>Create new layout</button>
    {showCreateLayoutPopup ?
      <CreateLayoutPopup playground={playground} plan={plan} nextPage={props.nextPage} /> :
      <></>}
  </>);
}

type CreateLayoutPopupParams = {
  playground: Playground;
  plan: Plan;
  nextPage: () => void;
}

type CreateLayoutFormParams = {
  width: number;
  length: number;
  height: number;
}

function CreateLayoutPopup(props: CreateLayoutPopupParams) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreateLayoutFormParams>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CreateLayoutFormParams> = data => {
    const newPlan = new Plan(
      props.plan.name,
      data.width,
      data.length,
      data.height,
      props.plan.id,
    );
    dispatch(update({ id: newPlan.id, changes: planStateBuilder(newPlan) }));
    navigate(playground_path());
  };

  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field-value field-dimensions-input">
        <span className="dimension">
          <label htmlFor="length">room length</label>
          <PillInput registrationOptions={register('length', { required: true })} description="ft" />
        </span>
        <span className="dimension">
          <label htmlFor="width">Width (ft)</label>
          <PillInput registrationOptions={register('width', { required: true })} description="ft" />
        </span>
        <span className="dimension">
          <label htmlFor="height">Height (ft)</label>
          <PillInput registrationOptions={register('height', { required: true })} description="ft" />
          <span></span>
        </span>
      </div>
      <div className="create-button">
        <input type="submit" value="Create layout" />
      </div>
    </form>
  </div>;
}
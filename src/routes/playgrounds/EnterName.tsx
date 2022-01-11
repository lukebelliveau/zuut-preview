import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

// import './NewPlayground.css';

import { create } from '../../features/plans/planSlice';
import Plan from '../../lib/plan';
import { planStateBuilder } from '../../features/plans/planReduxAdapter';
import { setPlan } from '../../features/playgrounds/playgroundSlice';

export const new_playground_path = () => '/playgrounds/new';

type PlanNameParams = {
  name: string | undefined;
}

type EnterNameProps = {
  nextPage: () => void;
}

export default function EnterName(props: EnterNameProps) {
  const { register, handleSubmit } = useForm<PlanNameParams>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<PlanNameParams> = data => {
    const plan = new Plan(
      data.name,
    );
    dispatch(create(planStateBuilder(plan)));
    dispatch(setPlan(plan.id));
    props.nextPage();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>
        <label htmlFor="name">Give your grow a name.</label>
      </h1>
      <input placeholder="Give the grow plan a name" 
        {...register('name', { required: true })} />
    </form>
  );
}
                // <div className="field-value field-dimensions-input">
                //   <span className="dimension">
                //     <label htmlFor="length">Length (ft)</label>
                //     <input {...register('length', { required: true })} />
                //   </span>
                //   <span className="dimension">
                //     <label htmlFor="width">Width (ft)</label>
                //     <input {...register('width', { required: true })} />
                //   </span>
                //   <span className="dimension">
                //     <label htmlFor="height">Height (ft)</label>
                //     <input {...register('height')} />
                //   </span>
                // </div>
                // <div className="create-button">
                //   <input type="submit" value="Create layout" />
                // </div>
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

// import './NewPlayground.css';

import { create, update } from '../../../features/plans/planSlice';
import Plan from '../../../lib/plan';
import planReduxAdapter from '../../../features/plans/planReduxAdapter';
import { setPlan } from '../../../features/playgrounds/playgroundSlice';
import Section from './Section';
import NextButton from './NextButton';
import { useSandboxPlan } from '../../../app/hooks';
import { store } from '../../../app/store';

export const new_playground_path = () => '/playgrounds/new';

type PlanNameParams = {
  name: string | undefined;
}

type EnterNameProps = {
  nextPage: () => void;
}

export default function EnterName(props: EnterNameProps) {
  const { register, handleSubmit } = useForm<PlanNameParams>();
  const plan = useSandboxPlan();
  const dispatch = useDispatch();
  dispatch(setPlan(plan.id));

  const onSubmit: SubmitHandler<PlanNameParams> = data => {
    const updatedPlan = new Plan(
      data.name,
      plan.width,
      plan.length,
      plan.height,
      plan.id
    );
    dispatch(update({ id: updatedPlan.id, changes: updatedPlan }));
    props.nextPage();
  };

  return (<>
    <Section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>
          <label htmlFor="name">Give your grow a name.</label>
        </h2>
        <input type="text" placeholder="type the name here" 
          {...register('name', { required: true })} />
      </form>
    </Section>
    <NextButton nextPage={props.nextPage} />
  </>);
}

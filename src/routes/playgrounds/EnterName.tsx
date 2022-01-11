import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

// import './NewPlayground.css';

import { create } from '../../features/plans/planSlice';
import Plan from '../../lib/plan';
import { planStateBuilder } from '../../features/plans/planReduxAdapter';
import { setPlan } from '../../features/playgrounds/playgroundSlice';
import CloseButton from './CloseButton';
import Section from './Section';

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
    <Section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>
          <label htmlFor="name">Give your grow a name.</label>
        </h1>
        <input type="text" placeholder="type the name here" 
          {...register('name', { required: true })} />
      </form>
    </Section>
  );
}

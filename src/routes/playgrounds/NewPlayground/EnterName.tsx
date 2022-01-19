import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Section from './Section';
import NextButton from './NextButton';
import PlanRepository from '../../../lib/plan/planRepository';

export const new_playground_path = () => '/playgrounds/new';

type PlanNameParams = {
  name: string | undefined;
}

type EnterNameProps = {
  nextPage: () => void;
}

const planRepo = PlanRepository.forRedux();

export default function EnterName(props: EnterNameProps) {
  const { register, handleSubmit } = useForm<PlanNameParams>();

  const onSubmit: SubmitHandler<PlanNameParams> = data => {
    const plan = planRepo.default();
    plan.name = data.name;
    planRepo.update(plan);
    props.nextPage();
  };

  const plan = planRepo.default();

  return (<>
    <Section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>
          <label htmlFor="name">Give your grow a name.</label>
        </h2>
        <input type="text" placeholder="type the name here"
          value={plan?.name}
          {...register('name', { required: true })} />
      </form>
    </Section>
    <NextButton nextPage={props.nextPage} />
  </>);
}

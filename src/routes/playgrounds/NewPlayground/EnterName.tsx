import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';

import Section from './Section';
import NextButton from './NextButton';
import PlanRepository from '../../../lib/plan/planRepository';

export const new_playground_path = () => '/playgrounds/new';

type EnterNameProps = {
  nextPage: () => void;
}

const planRepo = PlanRepository.forRedux();

export default function EnterName(props: EnterNameProps) {
  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    const plan = planRepo.default();
    plan.name = event.target.value;
    planRepo.update(plan);
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      props.nextPage();
    }
  };

  const plan = planRepo.default();

  return (<>
    <Section>
      <h2>
        <label htmlFor="name">Give your grow a name.</label>
      </h2>
      <input type="text" placeholder="type the name here"
        name="name"
        value={plan?.name}
        onChange={onChange}
        onKeyDown={onKeyDown}
         />
    </Section>
    <NextButton nextPage={props.nextPage} />
  </>);
}

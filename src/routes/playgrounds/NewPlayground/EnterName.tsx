import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';

import Section from './Section';
import NextButton from './NextButton';
import usePlanAdapter from '../../../lib/plan/planAdapter';
import { PlanState } from '../../../features/plans/planState';

export const new_playground_path = () => '/playgrounds/new';

type EnterNameProps = {
  plan: PlanState;
  nextPage: () => void;
};

export default function EnterName({ plan, nextPage }: EnterNameProps) {
  const { updateName } = usePlanAdapter();
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateName(plan, event.target.value);
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      nextPage();
    }
  };

  return (
    <>
      <Section>
        <h2>
          <label htmlFor="name">Give your grow a name.</label>
        </h2>
        <input
          type="text"
          placeholder="type the name here"
          name="name"
          value={plan?.name}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </Section>
      <NextButton nextPage={nextPage} />
    </>
  );
}

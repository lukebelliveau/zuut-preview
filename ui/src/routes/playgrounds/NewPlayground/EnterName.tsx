import { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import Section from './Section';
import NextButton from './NextButton';
import { update } from '../../../features/plans/planSlice';
import PlanReduxAdapter from '../../../lib/plan/planReduxAdapter';
import { useBuildPlayground } from '../../../app/builderHooks';

type EnterNameProps = {
  nextPage: () => void;
};

export default function EnterName(props: EnterNameProps) {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();

  const plan = playground.plan;
  if (!plan) return <></>;

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    plan.name = event.target.value;
    dispatch(
      update({ id: plan.id, changes: PlanReduxAdapter.planToState(plan) })
    );
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      props.nextPage();
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
          onChange={onChange}
          onKeyDown={onKeyDown}
          aria-label="name"
        />
      </Section>
      <NextButton nextPage={props.nextPage} />
    </>
  );
}

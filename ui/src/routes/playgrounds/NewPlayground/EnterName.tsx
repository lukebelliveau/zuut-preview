import { KeyboardEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import Section from './Section';
import NextButton from './NextButton';

type EnterNameProps = {
  name: UseFormRegisterReturn;
  nextPage: () => void;
};

export default function EnterName({ name, nextPage }: EnterNameProps) {
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
          onKeyDown={onKeyDown}
          aria-label="name"
          {...name}
        />
      </Section>
      <NextButton nextPage={nextPage} />
    </>
  );
}

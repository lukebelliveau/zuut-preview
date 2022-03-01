import { SubmitHandler, useForm, UseFormRegisterReturn } from 'react-hook-form';

import LayoutIcon from '../../../images/glyphs/layout.svg';
import './EnterDimensions.css';

import PillInput from '../../../components/PillInput';
import Section from './Section';

interface EnterDimensionsProps {
  width: UseFormRegisterReturn;
  length: UseFormRegisterReturn;
  onSubmit: (data: any) => void;
}

export default function EnterDimensions({ width, length, onSubmit }: EnterDimensionsProps) {

  return (
    <>
      <Section>
        <h2>Tell me about your grow area</h2>
        <div className="dimension">
          <PillInput
            name="length"
            aria-label="length"
            label="room length"
            registrationOptions={length}
            description="ft"
          />
        </div>
        <div className="dimension">
          <PillInput
            name="width"
            aria-label="width"
            label="room width"
            registrationOptions={width}
            description="ft"
          />
        </div>
        <div className="create-button">
          <button className="primary" onClick={onSubmit}>
            <img alt="Layout icon" src={LayoutIcon} aria-hidden="true" />
            <span>Create new layout</span>
          </button>
        </div>
      </Section>
    </>
  );
}

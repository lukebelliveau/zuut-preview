import { UseFormRegisterReturn } from 'react-hook-form';

import './PillInput.css';

type PillInputProps = {
  description: string;
  label: string;
  name: string;
  registrationOptions: UseFormRegisterReturn;
  'aria-label': string;
};

export default function PillInput(props: PillInputProps) {
  return (
    <div className="pill-input">
      <label htmlFor={props.name}>{props.label}</label>
      <div className="pill-container">
        <div className="pill">
          <input
            type="text"
            aria-label={props['aria-label']}
            {...props.registrationOptions}
          />
          <div className="description" aria-hidden="true">
            <div>{props.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

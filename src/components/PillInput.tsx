import { UseFormRegisterReturn } from 'react-hook-form';

import './PillInput.css';

type PillInputProps = {
  description: string;
  label: string;
  name: string;
  registrationOptions: UseFormRegisterReturn;
}

export default function PillInput(props: PillInputProps) {
  return <div className="pill-input">
    <label htmlFor={props.name}>{props.label}</label>
    <div className="pill-container">
      <div className="pill">
        <input type="text" {...props.registrationOptions} />
        <div className="description">{props.description}</div>
      </div>
    </div>
  </div>;
}
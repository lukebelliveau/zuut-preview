import { UseFormRegisterReturn } from 'react-hook-form';

type PillInputProps = {
  description: string;
  registrationOptions: UseFormRegisterReturn;
}

export default function PillInput(props: PillInputProps) {
  return <>
    <input type="text" {...props.registrationOptions} />
    <span>{props.description}</span>
  </>;
}
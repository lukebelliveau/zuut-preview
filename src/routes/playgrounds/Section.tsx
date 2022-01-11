import CloseButton from './CloseButton';

import './Section.css';

type SectionProps = {
  children: React.ReactNode;
};

export default function Section(props: SectionProps) {
  return <section className="new-playground-section">
    <CloseButton />
    <div className="new-playground-content">
      {props.children}
    </div>
  </section>;
}
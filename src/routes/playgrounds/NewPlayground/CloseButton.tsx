import { useNavigate } from 'react-router-dom';
import { homePath } from '../../Home';

import CloseButtonIcon from '../../images/close_button.svg';
import './CloseButton.css';

export default function CloseButton() {
  const navigate = useNavigate();
  
  return <a id="close-button" href={homePath()} onClick={() => navigate(homePath())}>
    <img alt="Close button" src={CloseButtonIcon} />
  </a>;
}
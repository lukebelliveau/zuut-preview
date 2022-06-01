import Modal from 'react-modal';
import { new_demo_path } from '../../App';
import { isDemoMode } from '../../app/store';
import { new_playground_path } from '../../routes/playgrounds/NewPlayground';
import Link from '../Link';
import './Toolbar.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const ResetPlaygroundModal = ({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) => {
  const link = isDemoMode() ? new_demo_path() : new_playground_path();

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="reset-playground-modal">
        <p>Resetting will cause your current playground to be gone forever.</p>
        <p>Are you sure you want to reset your playground?</p>
        <div>
          <Link to={link}>
            <button className="warning">Reset playground</button>
          </Link>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPlaygroundModal;

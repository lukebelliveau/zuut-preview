import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '20%',
    left: '10%',
    width: '50%',
    bottom: 'auto',
  },
};

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const MobileWarningModal = () => {
  const isMobile =
    (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i)) !== null;

  const [open, setOpen] = useState(isMobile);

  const closeModal = () => setOpen(false);

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Mobile device warning"
    >
      <div>
        <p>We've detected you are using ZUUT on a mobile device.</p>
        <p>
          Please be aware that ZUUT is intended for use on larger displays, and
          you will get a much better experience on a computer or tablet.
        </p>
        <div>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default MobileWarningModal;

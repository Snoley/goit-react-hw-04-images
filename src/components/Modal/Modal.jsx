import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay } from './Modal.Styled';

const modalRoot = document.querySelector('#modal');

function ModalWindow(props) {
  useEffect(() => {
    function handleKeyDown(event) {
      const { keyCode } = event;
      if (keyCode === 27) {
        props.close();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  function handleBackdropClick(event) {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      props.close();
    }
  }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>{props.children}</Modal>
    </Overlay>,
    modalRoot
  );
}

export default ModalWindow;

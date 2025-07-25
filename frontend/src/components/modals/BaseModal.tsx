import PropTypes from 'prop-types';
import type { JSX } from 'react';
import ReactDOM from 'react-dom';

import classes from './BaseModal.module.css';

interface BackdropProps {
    onClose: () => void;
}

const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className={classes.backdrop} onClick={onClose}/>;
};

Backdrop.propTypes = {
    onClose: PropTypes.func.isRequired,
};

interface ModalOverlayProps {
    children: JSX.Element | string | number;
}

const ModalOverlay = ({ children='' }: ModalOverlayProps) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

ModalOverlay.propTypes = {
    children: PropTypes.any
};

const portalElement = document.getElementById('overlays')!;

interface ModalProps {
    onClose: () => void;
    children: JSX.Element | string | number;
}

const BaseModal = ({ onClose, children='' }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

BaseModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any
};

export default BaseModal;

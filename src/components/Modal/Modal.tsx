import React from 'react';
import './Modal.scss';

type ModalProps = {
  title: string;
  onCancel: () => void;
  children: React.ReactNode;
};

const Modal = ({ title, onCancel, children }: ModalProps) => {
  return (
    <div className="modal" onClick={onCancel}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2 className="modalTitle">{title}</h2>
          <div className="modalClose" onClick={onCancel}>
            &#10006;
          </div>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

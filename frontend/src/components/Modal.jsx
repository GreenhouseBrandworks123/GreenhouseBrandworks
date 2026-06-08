import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SVGIcon } from './SVGIcon';

export const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button
          className="btn-icon modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <SVGIcon name="close" size={24} />
        </button>
        {title && <h2>{title}</h2>}
        {subtitle && <p className="modal-sub">{subtitle}</p>}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
};
export default Modal;

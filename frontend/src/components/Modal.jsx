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
      <div className="modal-content" style={{ position: 'relative', padding: '40px 24px 24px 24px' }}>
        
        {/* RAW BUTTON: No global classes allowed, completely bypassing the CSS pollution */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            left: 'auto',
            bottom: 'auto',
            transform: 'none',
            margin: 0,
            padding: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            color: 'var(--text-muted, #fff)',
            opacity: 0.7
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          <SVGIcon name="close" size={20} />
        </button>

        {/* TITLE: Takes up full width, leaves a safety gap on the right, and wraps normally */}
        {title && (
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '1.8rem', 
            paddingRight: '48px', 
            display: 'block', 
            width: '100%', 
            boxSizing: 'border-box',
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'break-word'
          }}>
            {title}
          </h2>
        )}

        {subtitle && <p className="modal-sub" style={{ marginTop: 0 }}>{subtitle}</p>}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
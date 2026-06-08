import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SVGIcon } from './SVGIcon';

export const Lightbox = ({ isOpen, project, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !project) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('lightbox')) {
      onClose();
    }
  };

  return createPortal(
    <div className="lightbox" onClick={handleOverlayClick}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
        <SVGIcon name="close" size={32} />
      </button>

      <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous project">
        <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>
          <SVGIcon name="arrowRight" size={24} />
        </span>
      </button>

      <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next project">
        <SVGIcon name="arrowRight" size={24} />
      </button>

      <div className="lightbox-content">
        <div className="lightbox-image">
          <img src={project.image} alt={project.title} />
        </div>

        <div className="lightbox-details">
          <span>{project.category}</span>
          <h2>{project.title}</h2>
          <p className="lightbox-desc">{project.description}</p>

          <div className="lightbox-meta">
            <div className="lightbox-meta-item">
              <strong>Client</strong>
              <p>{project.client}</p>
            </div>
            <div className="lightbox-meta-item">
              <strong>Role</strong>
              <p>{project.role}</p>
            </div>
            <div className="lightbox-meta-item">
              <strong>Year</strong>
              <p>{project.year}</p>
            </div>
            <div className="lightbox-meta-item">
              <strong>Focus</strong>
              <p>{project.focus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default Lightbox;

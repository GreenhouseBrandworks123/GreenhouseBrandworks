import { useState } from 'react';

// Import portfolio images
import brandingImg from '../assets/branding.png';
import webImg from '../assets/web.png';
import printImg from '../assets/print.png';
import marketingImg from '../assets/marketing.png';

// Simple gallery items — no titles, descriptions, or detail metadata.
// Add more entries to any category by duplicating and changing the image import.
const galleryItems = [
  { id: 1, category: 'branding',  image: brandingImg  },
  { id: 2, category: 'webdesign', image: webImg        },
  { id: 3, category: 'print',     image: printImg      },
  { id: 4, category: 'marketing', image: marketingImg  },
];

const FILTERS = [
  { id: 'all',       label: 'All Projects' },
  { id: 'branding',  label: 'Branding'     },
  { id: 'webdesign', label: 'Web Design'   },
  { id: 'print',     label: 'Print'        },
  { id: 'marketing', label: 'Marketing'    },
];

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="page-container">
      {/* Portfolio Header */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="section-container">
          <span className="section-badge">Selected Work</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Cases that inspire.
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
            We collaborate with ambitious organizations to build brand assets and online products that establish visual dominance and drive actions.
          </p>
        </div>
      </section>

      {/* Filter Bar + Gallery Grid */}
      <section className="section section-bg" style={{ paddingTop: '60px' }}>
        <div className="section-container">
          {/* Category filter buttons */}
          <div className="portfolio-filters">
            {FILTERS.map(btn => (
              <button
                key={btn.id}
                className={`filter-btn ${activeFilter === btn.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Image grid — images are display-only, no click actions */}
          <div className="portfolio-grid">
            {visibleItems.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img src={item.image} alt={item.category} />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {visibleItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '1.2rem' }}>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

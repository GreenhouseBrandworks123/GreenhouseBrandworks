import { useState } from 'react';

// Import portfolio images (using your current 4 as placeholders)
import brandingImg from '../assets/branding.png';
import webImg from '../assets/web.png';
import printImg from '../assets/print.png';
import marketingImg from '../assets/marketing.png';

// Expanded gallery items — 4 per category, recycling the images above
const galleryItems = [
  // Electronic Media
  { id: 1, category: 'electronic', image: brandingImg },
  { id: 2, category: 'electronic', image: webImg },
  { id: 3, category: 'electronic', image: printImg },
  { id: 4, category: 'electronic', image: marketingImg },

  // Print Media
  { id: 5, category: 'print', image: printImg },
  { id: 6, category: 'print', image: brandingImg },
  { id: 7, category: 'print', image: marketingImg },
  { id: 8, category: 'print', image: webImg },

  // Digital Marketing
  { id: 9, category: 'digital', image: marketingImg },
  { id: 10, category: 'digital', image: webImg },
  { id: 11, category: 'digital', image: brandingImg },
  { id: 12, category: 'digital', image: printImg },

  // Outdoor Advertising
  { id: 13, category: 'outdoor', image: webImg },
  { id: 14, category: 'outdoor', image: marketingImg },
  { id: 15, category: 'outdoor', image: printImg },
  { id: 16, category: 'outdoor', image: brandingImg },
];

const FILTERS = [
  { id: 'electronic', label: 'Electronic Media'},
  { id: 'print',      label: 'Print Media' },
  { id: 'digital',    label: 'Digital Marketing' },
  { id: 'outdoor',    label: 'Outdoor Advertising' },
];

export const Portfolio = () => {
  // Set default active filter to 'electronic'
  const [activeFilter, setActiveFilter] = useState('electronic');

  // Simplified filter logic since 'all' is no longer an option
  const visibleItems = galleryItems.filter(item => item.category === activeFilter);

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

          {/* Image grid */}
          <div className="portfolio-grid">
            {visibleItems.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img src={item.image} alt={`${item.category} placeholder`} />
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
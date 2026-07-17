import { useState, useEffect } from 'react';

// Import all 20 portfolio images from the portfolio-preview folder
import p1 from '../assets/portfolio-preview/p1.webp';
import p2 from '../assets/portfolio-preview/p2.webp';
import p3 from '../assets/portfolio-preview/p3.webp';
import p4 from '../assets/portfolio-preview/p4.webp';
import p5 from '../assets/portfolio-preview/p5.webp';
import p6 from '../assets/print-media/ps1.jpg'
import p7 from '../assets/print-media/ps2.jpg'
import p8 from '../assets/print-media/ps3.jpg'
import p9 from '../assets/print-media/ps4.jpg'
import p10 from '../assets/print-media/ps5.jpg';
import p11 from '../assets/portfolio-preview/p11.webp';
import p12 from '../assets/portfolio-preview/p12.webp';
import p13 from '../assets/portfolio-preview/p13.webp';
import p14 from '../assets/portfolio-preview/p14.webp';
import p15 from '../assets/portfolio-preview/p15.webp';
import p16 from '../assets/portfolio-preview/p16.webp';
import p17 from '../assets/portfolio-preview/p17.webp';
import p18 from '../assets/portfolio-preview/p18.webp';
import p19 from '../assets/portfolio-preview/p19.webp';
// import p20 from '../assets/portfolio-preview/p20.webp';

// Expanded gallery items — 5 images per category
const galleryItems = [
  // Electronic Media (Images 1-5)
  { id: 1, category: 'electronic', image: p1 },
  { id: 2, category: 'electronic', image: p2 },
  { id: 3, category: 'electronic', image: p3 },
  { id: 4, category: 'electronic', image: p4 },
  { id: 5, category: 'electronic', image: p5 },

  // Print Media (Images 6-10)
  { id: 6, category: 'print', image: p6 },
  { id: 7, category: 'print', image: p7 },
  { id: 8, category: 'print', image: p8 },
  { id: 9, category: 'print', image: p9 },
  { id: 10, category: 'print', image: p10 },

  // Digital Marketing (Images 11-15)
  { id: 11, category: 'digital', image: p11 },
  { id: 12, category: 'digital', image: p12 },
  { id: 13, category: 'digital', image: p13 },
  { id: 14, category: 'digital', image: p14 },
  { id: 15, category: 'digital', image: p15 },

  // Outdoor Advertising (Images 16-20)
  { id: 16, category: 'outdoor', image: p16 },
  { id: 17, category: 'outdoor', image: p17 },
  { id: 18, category: 'outdoor', image: p18 },
  { id: 19, category: 'outdoor', image: p19 },
  { id: 1, category: 'outdoor', image: p1 },
];

const FILTERS = [
  { id: 'electronic', label: 'Electronic Media'},
  { id: 'print',      label: 'Print Media' },
  { id: 'digital',    label: 'Digital Marketing' },
  { id: 'outdoor',    label: 'Outdoor Advertising' },
];

export const Portfolio = ({ initialFilter = 'electronic' }) => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  // Update the active filter if the user navigates here from another page
  useEffect(() => {
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

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
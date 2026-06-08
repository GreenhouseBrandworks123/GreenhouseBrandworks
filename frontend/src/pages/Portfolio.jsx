import React, { useState } from 'react';
import { SVGIcon } from '../components/SVGIcon';
import { Lightbox } from '../components/Lightbox';

// Import local portfolio assets
import brandingImg from '../assets/branding.png';
import webImg from '../assets/web.png';
import printImg from '../assets/print.png';
import marketingImg from '../assets/marketing.png';

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const projects = [
    {
      title: "Nordic Minimal",
      category: "Branding",
      image: brandingImg,
      client: "Nordic Styles Co.",
      role: "Visual Identity & Strategy",
      year: "2025",
      focus: "Identity Architecture",
      description: "A comprehensive visual identity refresh for a Scandinavian fashion label, highlighting natural textures, strict grid typography, and sustainable packaging substrates."
    },
    {
      title: "Aether Luxury E-Commerce",
      category: "Web Design",
      image: webImg,
      client: "Aether Living Ltd.",
      role: "UX/UI Design & Front-End",
      year: "2025",
      focus: "Conversion Engineering",
      description: "A high-end digital shopping storefront designed for luxury furniture pieces. Developed with glassmorphic layers, dark mode controls, and conversion-optimized checkout panels."
    },
    {
      title: "Verdant Editorial Book",
      category: "Print",
      image: printImg,
      client: "Greenhouse Publications",
      role: "Art Direction & Editorial Design",
      year: "2024",
      focus: "Premium Publication",
      description: "Art direction and layout architecture for a curated landscape photography collection. Printed on raw, organic heavyweight papers with embossed matte finishes."
    },
    {
      title: "Vibrant Campaign Concept",
      category: "Marketing",
      image: marketingImg,
      client: "Vertex Corp",
      role: "Digital Campaign Design",
      year: "2026",
      focus: "Lead Funnel Capture",
      description: "High-contrast digital display campaign combining 3D abstract models and bold layout grids to boost engagement and newsletter signups."
    }
  ];

  // Helper matching for category filtering
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase().replace(/\s+/g, '') === activeFilter.toLowerCase().replace(/\s+/g, ''));

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

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

      {/* Portfolio Grid & Filter */}
      <section className="section section-bg" style={{ paddingTop: '60px' }}>
        <div className="section-container">
          {/* Category Filter Bar */}
          <div className="portfolio-filters">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'branding', label: 'Branding' },
              { id: 'webdesign', label: 'Web Design' },
              { id: 'print', label: 'Print' },
              { id: 'marketing', label: 'Marketing' }
            ].map((btn) => (
              <button
                key={btn.id}
                className={`filter-btn ${activeFilter === btn.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(btn.id);
                  setLightboxIndex(-1); // reset lightbox on filter switch
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Grid list */}
          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => {
              // Find the absolute project index in the full list for correct matching
              const originalIndex = projects.findIndex(p => p.title === project.title);
              
              return (
                <div
                  key={index}
                  className="portfolio-card"
                  onClick={() => setLightboxIndex(index)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-overlay">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <div className="portfolio-overlay-btn">
                      <SVGIcon name="arrowRight" size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '1.2rem' }}>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Slideshow Component */}
      <Lightbox
        isOpen={lightboxIndex >= 0}
        project={filteredProjects[lightboxIndex]}
        onClose={() => setLightboxIndex(-1)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
export default Portfolio;

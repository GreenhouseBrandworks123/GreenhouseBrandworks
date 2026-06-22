import { useState } from 'react';
import { SVGIcon } from '../components/SVGIcon';
import brandingImg from '../assets/branding.png';

export const About = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "PRACTICE",
      description: "Practice that incorporates extensive experience in creative advertising communication and deep knowledge of branding technologies"
    },
    {
      num: "02",
      title: "INTERNALIZE",
      description: "The capability to quickly Internalize emerging brand building platform and set the narrative for optimized value"
    },
    {
      num: "03",
      title: "EXTEND",
      description: "Extend an optimized combination of practice and technology to bring the best value to the brand"
    }
  ];

  // Helper function to return beautiful theme colors with explicit light-mode fallbacks
  const getActiveColor = (step) => {
    if (step === 0) return 'var(--color-practice, var(--accent, #65a30d))';
    if (step === 1) return 'var(--color-internalize, #15803d)'; // Rich Emerald Green
    return 'var(--color-extend, #4b5563)'; // Balanced Slate Gray
  };

  return (
    <div className="page-container">
      {/* About Header */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="section-container">
          <span className="section-badge">Our Story</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Inside Greenhouse.
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
            We are a group of developers, graphic artists, and digital strategists working out of Bangalore, India. We construct identities that stick and systems that scale.
          </p>
        </div>
      </section>

      {/* Story & Visual Section */}
      <section className="section section-bg" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="section-container">
          <div className="grid-2">
            <div>
              <h2 style={{ marginBottom: '24px' }}>Bridging design and commerce since 2006.</h2>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem' }}>
                Greenhouse Brandworks was established to eliminate generic, templated designs. We realized that corporate leaders were tired of choosing between agencies that only made pretty graphics and tech groups that only wrote functional but visual-less systems.
              </p>
              <p style={{ marginBottom: '24px' }}>
                We unified these practices. Over the past 20 years, we have scaled visual frameworks for over 50 global companies, delivering designs that increase customer trust and conversion-focused systems that capture verified sales leads.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '4px' }}>20+</h3>
                  <p style={{ fontWeight: '600', color: 'var(--text)' }}>Years of Refinement</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '4px' }}>98%</h3>
                  <p style={{ fontWeight: '600', color: 'var(--text)' }}>Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="value-image" style={{ height: '480px' }}>
              <img src={brandingImg} alt="Greenhouse design system desk layout" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Panels */}
      <section className="section">
        <div className="section-container">
          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '48px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '24px' }}>
                <SVGIcon name="branding" size={40} />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Our Mission</h3>
              <p style={{ fontSize: '1.05rem', flexGrow: 1 }}>
                To empower companies with high-end, clean brand assets and ultra-responsive digital products that communicate values instantly, shorten sales cycles, and build customer loyalty.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '48px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '24px' }}>
                <SVGIcon name="web" size={40} />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Our Vision</h3>
              <p style={{ fontSize: '1.05rem', flexGrow: 1 }}>
                To set the global standard for high-performance creative agency systems, demonstrating that design brilliance and code efficiency are joint drivers of modern corporate expansion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Step Section */}
      <section className="philosophy-section">
        <div className="philosophy-container">
          
          {/* Section Heading */}
          <div className="philosophy-header">
            <span className="section-badge-text">How We Think</span>
            <h2>Our Creative Philosophy</h2>
            <p>
              Get a taste of the PIE (Practice - Internalize - Extend)
            </p>
          </div>

          {/* Interactive Core Layout Split */}
          <div className="philosophy-grid">
            
            {/* LEFT COLUMN: Interactive SVG Pie Diagram */}
            <div className="pie-visual-wrapper">
              <svg viewBox="0 0 200 200" className="pie-svg">
                {/* Slice 01: Practice */}
                <path
                  d="M 100 100 L 100 10 A 90 90 0 0 1 177.94 145 Z"
                  fill={activeStep === 0 ? getActiveColor(0) : 'var(--pie-slice-1-muted, #f1f5e9)'}
                  className="pie-slice-path"
                  style={{ transform: activeStep === 0 ? 'scale(1.04)' : 'scale(1)' }}
                  onClick={() => setActiveStep(0)}
                />
                {/* Slice 02: Internalize */}
                <path
                  d="M 100 100 L 177.94 145 A 90 90 0 0 1 22.06 145 Z"
                  fill={activeStep === 1 ? getActiveColor(1) : 'var(--pie-slice-2-muted, #e8f0dc)'}
                  className="pie-slice-path"
                  style={{ transform: activeStep === 1 ? 'scale(1.04)' : 'scale(1)' }}
                  onClick={() => setActiveStep(1)}
                />
                {/* Slice 03: Extend */}
                <path
                  d="M 100 100 L 22.06 145 A 90 90 0 0 1 100 10 Z"
                  fill={activeStep === 2 ? getActiveColor(2) : 'var(--pie-slice-3-muted, #f3f4f6)'}
                  className="pie-slice-path"
                  style={{ transform: activeStep === 2 ? 'scale(1.04)' : 'scale(1)' }}
                  onClick={() => setActiveStep(2)}
                />

                {/* Center Cutout Donut Hole - Dynamically follows background themes */}
                <circle cx="100" cy="100" r="35" fill="var(--pie-center-bg, var(--bg, #ffffff))" className="pie-center-circle" />
                
                {/* Inner Static Label */}
                <text x="100" y="105" textAnchor="middle" fill="var(--pie-center-text, var(--text, #111827))" className="pie-center-text">
                  PIE
                </text>
              </svg>

              {/* Outside Quick-Click floating buttons */}
              <button 
                onClick={() => setActiveStep(0)} 
                className={`pie-label-btn btn-practice ${activeStep === 0 ? 'active-0' : ''}`}>
                01. Practice
              </button>
              <button 
                onClick={() => setActiveStep(1)} 
                className={`pie-label-btn btn-internalize ${activeStep === 1 ? 'active-1' : ''}`}>
                02. Internalize
              </button>
              <button 
                onClick={() => setActiveStep(2)} 
                className={`pie-label-btn btn-extend ${activeStep === 2 ? 'active-2' : ''}`}>
                03. Extend
              </button>
            </div>

            {/* RIGHT COLUMN: Clean Single Info Display Panel */}
            <div className="info-card-wrapper">
              {/* Dynamic Left Colored Accent Strip */}
              <div 
                className="card-accent-strip"
                style={{ backgroundColor: getActiveColor(activeStep) }}
              />

              {/* Dynamic Info Content */}
              <div key={activeStep} className="animate-text-fade">
                <span 
                  className="info-stage-num"
                  style={{ color: getActiveColor(activeStep) }}
                >
                  STAGE {steps[activeStep].num}
                </span>
                
                <h3 className="info-title">
                  {steps[activeStep].title}
                </h3>
                
                <p className="info-desc">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
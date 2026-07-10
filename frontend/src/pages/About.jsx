import { SVGIcon } from '../components/SVGIcon';
import brandingImg from '../assets/branding.png';

export const About = () => {
  return (
    <div className="page-container">
      {/* About Header */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="section-container">
          <span className="section-badge">Our Story</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            About Us
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
           We are Greenhouse Brandworks. We are a small team of designers 
           from very diverse backgrounds and with an extensive skillset. Being in the
           industry for more than 20 years, we’ve worked with some giant names from 
           the tech world. We make sure you get the highest quality creatives, whether
           it’s a small infographic, a book or an event campaign. In an era of cheap 
           imitation jewellery, we’re the classy Kohinoor.
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

      
    </div>
  );
};

export default About;
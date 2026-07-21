import { SVGIcon } from '../components/SVGIcon';
import brandingImg from '../assets/branding.png';
import aboutusTimeline from '../assets/aboutus/aboutus.avif';  // Timeline image (01 - 02 - 03)
import rampUpIcon from '../assets/aboutus/aboutus1.avif';       // Up-arrow icon
import reachIcon from '../assets/aboutus/aboutus2.avif';        // Expand icon
import raceIcon from '../assets/aboutus/aboutus3.avif';         // Right-arrow icon

export const About = ({ setCurrentPage }) => {
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

      {/* --- WHY CHOOSE US / GTM SECTION --- */}
<section className="why-choose-us-section">
  <div className="section-container">
    
    {/* Section Header */}
    <div className="why-choose-us-header">
      <h2>
        Why <span className="highlight-text">choose us?</span>
      </h2>
      <p className="subtitle">We follow the 3Rs of GTM (Go-to-Market)</p>
    </div>

    {/* 3 Columns: RAMP UP, REACH, RACE */}
    <div className="three-rs-grid">
      
      {/* 01. RAMP UP */}
      <div className="rs-card">
        <div className="rs-title-wrapper">
          <img src={rampUpIcon} alt="Ramp Up" className="rs-icon" />
          <h3>RAMP UP</h3>
        </div>
        <p>
          The GHBW Starter Kit speedily builds your image in a scenario
          where technology continues to multiply opportunities for people
          to experience your brand.
        </p>
      </div>

      {/* 02. REACH */}
      <div className="rs-card">
        <div className="rs-title-wrapper">
          <img src={reachIcon} alt="Reach" className="rs-icon" />
          <h3>REACH</h3>
        </div>
        <p>
          The GHBW Starter Kit offers a solution for every format - digital,
          social, print. It put together a consistent brand image across
          hundreds of touch points.
        </p>
      </div>

      {/* 03. RACE */}
      <div className="rs-card">
        <div className="rs-title-wrapper">
          <img src={raceIcon} alt="Race" className="rs-icon" />
          <h3>RACE</h3>
        </div>
        <p>
          The GHBW Starter Kit helps you saddle up so fast, that you are set
          to convert the best opportunities to business gains quickly and beat
          your competition ASAP.
        </p>
      </div>

    </div>

    {/* Process Timeline Image */}
    <div className="timeline-container">
      <img src={aboutusTimeline} alt="GTM Process Timeline" className="timeline-img" />
    </div>

    {/* Footer & CTA Button */}
    <div className="why-choose-us-footer">
      <p className="essence-text">All in all, time is of the essence!</p>
      <button className="btn-gtm-primary" onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }} >Lets get started</button>
    </div>

  </div>
</section>

      {/* --- CUSP VALUE PROPOSITION SECTION --- */}
<section className="section">
  <div className="section-container">
    <div className="cusp-banner-card">
      <h2 className="cusp-title">
        The green <span className="cusp-highlight">CUSP</span> for the best value
      </h2>
      <p className="cusp-subtitle">
        <span className="cusp-highlight">C</span>ost Optimization &ndash; Gain Quick{' '}
        <span className="cusp-highlight">U</span>nderstanding &ndash;{' '}
        <span className="cusp-highlight">S</span>peedy GTM
      </p>
    </div>
  </div>
</section>

      
    </div>
  );
};

export default About;
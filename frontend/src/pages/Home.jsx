import React, { useState, useEffect, useRef } from 'react';
import { SVGIcon } from '../components/SVGIcon';
import brandingImg from '../assets/branding.png';
import webImg from '../assets/web.png';
import printImg from '../assets/print.png';

// Subcomponent for counting stats when they enter the viewport
const AnimatedCounter = ({ endValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * endValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [endValue, duration]);

  return <span ref={elementRef}>{count}</span>;
};

export const Home = ({ setCurrentPage }) => {
  const featuredProjects = [
    {
      title: "Nordic Minimal Identity",
      category: "Branding",
      image: brandingImg
    },
    {
      title: "Aether Luxury E-Commerce",
      category: "Web Design",
      image: webImg
    },
    {
      title: "Verdant Editorial Book",
      category: "Print",
      image: printImg
    }
  ];

  const clientLogos = [
    "Mphasis", "Comviva", "ABB", "BHORUKA", 
    "BCIC", "TESSOLVE", "PANAMAX", "invest in bavaria","FSS","TOYOTA","The Golden Palms","AXA","black N green","Kushagramati Analytics","ascendum","uthunga","MobiFin","NPST","TimePay","Tecnotree","Zaggle","PANCHEE TANTRA"
  ];

  return (
    <div className="page-container">
      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-mesh"></div>
        <div className="hero-container">
          <div className="hero-badge">Greenhouse Brandworks</div>
          <h1>We help your <span>brand grow</span>.</h1>
          <p className="hero-subtext">
            We are a premium creative agency crafting modern identity systems, bespoke web experiences, and data-driven digital campaigns that drive commercial success.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }}>
              Get a Quote
            </button>
            <button className="btn btn-secondary" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
              View Work
            </button>
          </div>
        </div>
      </section>

      {/* --- SERVICES OVERVIEW --- */}
      <section className="section section-bg">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Our Focus</span>
            <h2>Core capabilities.</h2>
            <p>We combine design brilliance with engineering excellence to build tools that work for your business.</p>
          </div>

          <div className="grid-3">
            <div className="service-card">
              <div className="service-icon">
                <SVGIcon name="branding" size={28} />
              </div>
              <h3>Branding & Identity</h3>
              <p>Designing memorable logo marks, visual system structures, typography standards, and brand guidelines.</p>
              <a href="#services" className="service-link" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); window.scrollTo(0,0); }}>
                Read More <SVGIcon name="arrowRight" size={16} />
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <SVGIcon name="web" size={28} />
              </div>
              <h3>Website Design</h3>
              <p>Developing ultra-fast, premium layouts, interface architecture, and interactions customized for conversion.</p>
              <a href="#services" className="service-link" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); window.scrollTo(0,0); }}>
                Read More <SVGIcon name="arrowRight" size={16} />
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <SVGIcon name="marketing" size={28} />
              </div>
              <h3>Digital Marketing</h3>
              <p>Driving growth with focused lead-generation channels, SEO alignment, and multi-platform advertising schedules.</p>
              <a href="#services" className="service-link" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); window.scrollTo(0,0); }}>
                Read More <SVGIcon name="arrowRight" size={16} />
              </a>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <button className="btn btn-secondary" onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }}>
              Explore All 10 Services
            </button>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="section">
        <div className="section-container">
          <div className="grid-2">
            <div>
              <span className="section-badge">The Difference</span>
              <h2>How we build success.</h2>
              <p style={{ marginBottom: '32px' }}>
                We bridge the gap between creative storytelling and logical conversion systems, ensuring your brand isn't just beautiful, but highly commercial.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="why-card">
                  <h3>Creativity</h3>
                  <p>Rejecting generic templates to craft bespoke visuals that set your agency apart from standard competition.</p>
                </div>
                <div className="why-card">
                  <h3>Strategy</h3>
                  <p>In-depth market investigation, positioning logic, and funnel alignment to capture high-value leads.</p>
                </div>
                <div className="why-card">
                  <h3>Execution</h3>
                  <p>Flawless delivery, micro-interactions, responsive coding, and robust, reliable launch checks.</p>
                </div>
              </div>
            </div>

            <div className="value-image">
              <img src={brandingImg} alt="Branding process" />
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION SECTION --- */}
      <section className="section section-bg">
        <div className="section-container">
          <div className="grid-2">
            <div className="value-image" style={{ height: '400px' }}>
              <img src={webImg} alt="Minimal agency work environment" />
            </div>
            <div>
              <span className="section-badge">Philosophy</span>
              <h2>Design that speaks. Strategy that performs.</h2>
              <p style={{ marginBottom: '24px', fontSize: '1.1rem' }}>
                We believe premium design isn't a luxury—it is a functional requirement. Your visual identity is your primary customer touchpoint.
              </p>
              <p style={{ marginBottom: '32px' }}>
                Our team takes a holistic look at your corporate ecosystem to streamline visual systems, decrease loading bottlenecks, and direct users seamlessly toward your commercial targets. We structure paths that turn anonymous visitors into long-term advocates.
              </p>
              <button className="btn btn-primary" onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }}>
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO PREVIEW --- */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Portfolio Preview</span>
            <h2>Recent creations.</h2>
            <p>A handpicked selection of brand assets and platforms we've designed for growth-oriented companies.</p>
          </div>

          <div className="grid-3" style={{ marginBottom: '56px' }}>
            {featuredProjects.map((project, i) => (
              <div 
                key={i} 
                className="portfolio-card"
                onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}
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
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-secondary" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
              View Complete Work
            </button>
          </div>
        </div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <section className="section section-bg">
        <div className="section-container">
          <div className="stats-container">
            <div className="stat-item">
              <h3><AnimatedCounter endValue={20} />+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3><AnimatedCounter endValue={50} />+</h3>
              <p>Active Clients</p>
            </div>
            <div className="stat-item">
              <h3><AnimatedCounter endValue={100} />+</h3>
              <p>Projects Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CLIENT LOGO SHOWCASE TICKER --- */}
      <section className="logo-ticker">
        <div className="logo-ticker-track">
          {/* Double list for smooth infinite wrapping */}
          {clientLogos.concat(clientLogos).map((logo, index) => (
            <div key={index} className="logo-ticker-item">
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-mesh" style={{ top: 'auto', bottom: '-20%', left: '20%', right: '20%' }}></div>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <span className="section-badge">Start Today</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Let's build your brand together.
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Ready to redesign your business identity or launch a high-performance web experience? Let's discuss your project targets.
          </p>
          <button className="btn btn-primary" onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }}>
            Book a Discovery Call
          </button>
        </div>
      </section>
    </div>
  );
};
export default Home;

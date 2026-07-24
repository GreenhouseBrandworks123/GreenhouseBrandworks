import { useState, useEffect, useRef } from 'react';

import { SVGIcon } from '../components/SVGIcon';



import slide1 from '../assets/slider-images/slide1.jpeg';
import slide2 from '../assets/slider-images/slide2.jpeg';
import slide3 from '../assets/slider-images/slide3.jpeg';

import differentiator1 from '../assets/differentiators/differentiator1.png';
import differentiator2 from '../assets/differentiators/differentiator2.png';
import differentiator3 from '../assets/differentiators/differentiator3.png';

import { lazy, Suspense } from "react";

const PortfolioPreview = lazy(() =>
    import("../components/PortfolioPreview")
);

const ClientLogoTicker=lazy(()=>
import("../components/ClientLogoTicker")

);
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

    const element = elementRef.current;
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [endValue, duration]);

  return <span ref={elementRef}>{count}</span>;
};



export const Home = ({ setCurrentPage }) => {
  // Brand Vision Slider State & Logic
  const [currentSlide, setCurrentSlide] = useState(0);
  

  const visionSlides = [
    {
      subtitle: "Our powerful pitches",
      title: "Win Boardroom Decisions",
      highlight: "in favor of our clients",
      image: slide1
    },
    {
      subtitle: "We help Top-Notch Companies",
      title: "Tell Their Story",
      highlight: "Convincingly",
      image: slide2
    },
    {
      subtitle: "We help clients",
      title: "Draw-in",
      highlight: "the Best Talent",
      image: slide3
    }
  ];

  // Auto-slide every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % visionSlides.length);
    }, 4500); // 4500ms = 4.5 seconds

    return () => clearInterval(interval);
  }, [visionSlides.length]);

  const differentiators = [
    {
      description: "We leverage a unique blend of insights gleaned from traditional advertising, and knowledge of emerging branding platforms, to deliver highly relevant and unified campaigns for today's customers",
      image: differentiator1
    },
    {
      description: "Our top clients, are a loyal following, staying wth us from our early days. Not only have they repeatedly rehired our services, they have also referred us to top notch technology providers",
      image: differentiator2
    },
    {
      description: "Our team of professionals possess deep experience in design and content writing, garnered from having worked with creative agencies extensively",
      image: differentiator3
    }
  ];

 

  return (
    <div className="home-page">
      {/* --- BRAND VISION SLIDER (AUTO) --- */}
      {/* Removed onMouseEnter and onMouseLeave */}
      <section className="vision-slider">
        <div className="vision-slider-overlay">
          
          {/* Left Side: Auto-changing Text */}
          <div className="vision-slider-content">
            <div key={currentSlide} className="vision-text-animate">
              {visionSlides[currentSlide].subtitle && (
                <span className="vision-subtitle">{visionSlides[currentSlide].subtitle}</span>
              )}
              <h2 className="vision-title">
                {visionSlides[currentSlide].title}{" "}
                {visionSlides[currentSlide].highlight && (
                  <span className="vision-highlight">{visionSlides[currentSlide].highlight}</span>
                )}
              </h2>
            </div>
          </div>

          {/* Right Side: Full Image Display (No Cropping) */}
          <div className="vision-slider-image-wrapper">
            <img
              key={currentSlide}
              src={visionSlides[currentSlide].image}
              alt={visionSlides[currentSlide].title}
              className="vision-image-animate"
            />
          </div>

        </div>
      </section>

      {/* --- SERVICES OVERVIEW --- */}
      <section className="section section-dot">
        <div className="section-container">
          <div className="section-header">
            <h2>What We Offer</h2>
            <p>We help you connect with your prospects with a strong first impression, that sets your company apart from your competition. Check our services.</p>
          </div>

          <div className="grid-4">
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

            <div className="service-card">
              <div className="service-icon">
                <SVGIcon name="outdoor" size={28} />
              </div>
              <h3>Outdoor Advertising</h3>
              <p>Eye-catching outdoor advertising campaigns that grab attention and drive results</p>
              <a href="#services" className="service-link" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); window.scrollTo(0,0); }}>
                Read More <SVGIcon name="arrowRight" size={16} />
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <SVGIcon name="web" size={28} />
              </div>
              <h3>Website/App Design</h3>
              <p>Developing ultra-fast, premium layouts, interface architecture, and interactions customized for conversion.</p>
              <a href="#services" className="service-link" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); window.scrollTo(0,0); }}>
                Read More <SVGIcon name="arrowRight" size={16} />
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <SVGIcon name="print" size={28} />
              </div>
              <h3>Print Solutions</h3>
              <p>Tactile materials create strong physical connections. We print on premium stocks with high-end typography layout rules.</p>
              <a href="#services" className="service-link" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); window.scrollTo(0,0); }}>
                Read More <SVGIcon name="arrowRight" size={16} />
              </a>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <button className="btn btn-secondary" onClick={() => { setCurrentPage('services'); window.scrollTo(0,0); }}>
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* --- BRAND PROMISE QUOTE --- */}
      <section className="brand-promise-section">
        <div className="brand-promise-anim-wrap">
          <div className="brand-promise-glass-card">
            <p className="brand-promise-quote">
              <span className="brand-promise-line">
                If you have an established brand, we'll follow your guidelines.
              </span>
              <span className="brand-promise-line brand-promise-highlight">
                If you don't, we'll create the brand for you!
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* --- OUR DIFFERENTIATORS --- */}
      <section className="section differentiators-section">
        <div className="section-container">
          <div className="differentiators-header">
            <h2 className="differentiators-title">
              <span className="differentiators-title--plain">OUR </span>
              <span className="differentiators-title--accent">Differentiators</span>
            </h2>
          </div>
          <div className="differentiators-list">
            {differentiators.map((item, i) => (
              <div
                key={i}
                className={`differentiator-row${i % 2 === 1 ? ' differentiator-row--reverse' : ''}`}
              >
                <div className="differentiator-image-col">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="differentiator-img"
                  />
                </div>
                <div className="differentiator-text-col">
                  <h3 className="differentiator-item-title">{item.title}</h3>
                  <p className="differentiator-item-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="philosophy-section">
        <div className="philosophy-container">
          <div className="philosophy-header">
            <span className="section-badge-text">HOW WE THINK</span>
            <h2>Our Creative Philosophy</h2>
            <p className="philosophy-subtitle">
              Get a taste of the PIE (Practice - Internalize - Extend)
            </p>
          </div>

          <div className="philosophy-grid">
            <div className="pie-visual-wrapper">
              <svg viewBox="0 0 200 200" className="pie-svg">
                <path
                  d="M 100 100 L 100 10 A 90 90 0 0 1 177.94 145 Z"
                  className="pie-slice-path slice-practice"
                />
                <path
                  d="M 100 100 L 177.94 145 A 90 90 0 0 1 22.06 145 Z"
                  className="pie-slice-path slice-internalize"
                />
                <path
                  d="M 100 100 L 22.06 145 A 90 90 0 0 1 100 10 Z"
                  className="pie-slice-path slice-extend"
                />
                <circle cx="100" cy="100" r="35" className="pie-center-circle" />
                <text x="100" y="100" textAnchor="middle" className="pie-center-text">
                  PIE
                </text>
              </svg>
            </div>

            <div className="philosophy-list-wrapper">
              <div className="static-info-item item-practice">
                <div className="info-item-header">
                  <div className="icon-container-box">
                    <img 
                      src="/icon-practice.png" 
                      alt="Practice Indicator" 
                      className="info-stage-icon-img" 
                    />
                  </div>
                  <h3 className="info-title">PRACTICE</h3>
                </div>
                <p className="info-desc">
                  Practice that incorporates extensive experience in creative advertising communication and deep knowledge of branding technologies.
                </p>
              </div>

              <div className="static-info-item item-internalize">
                <div className="info-item-header">
                  <div className="icon-container-box">
                    <img 
                      src="/icon-internalize.png" 
                      alt="Internalize Indicator" 
                      className="info-stage-icon-img" 
                    />
                  </div>
                  <h3 className="info-title">INTERNALIZE</h3>
                </div>
                <p className="info-desc">
                  The capability to quickly Internalize emerging brand building platform and set the narrative for optimized value.
                </p>
              </div>

              <div className="static-info-item item-extend">
                <div className="info-item-header">
                  <div className="icon-container-box">
                    <img 
                      src="/icon-extend.png" 
                      alt="Extend Indicator" 
                      className="info-stage-icon-img" 
                    />
                  </div>
                  <h3 className="info-title">EXTEND</h3>
                </div>
                <p className="info-desc">
                  Extend an optimized combination of practice and technology to bring the best value to the brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



    {/* --- PORTFOLIO PREVIEW SECTION --- */}
     <Suspense fallback={null}>
     <PortfolioPreview setCurrentPage={setCurrentPage} />
      </Suspense>

      {/* --- STATISTICS SECTION --- */}
      <section className="section section-dark">
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

      {/* --- CLIENT LOGO TICKER --- */}

     <Suspense fallback={null}>
    <ClientLogoTicker/>
    </Suspense>

      {/* --- FINAL CTA SECTION --- */}
      
      <section className="section section-dark section-cta" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-mesh" style={{ top: 'auto', bottom: '-20%', left: '20%', right: '20%' }}></div>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <span className="section-badge">Start Today</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Ready to Elevate Your Brand?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Ready to Elevate Your Brand? Contact us today to discover how Greenhouse Brandworks can help your business stand out.
          </p>
          <button className="btn btn-primary" onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }}>
            Drop Your Info
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
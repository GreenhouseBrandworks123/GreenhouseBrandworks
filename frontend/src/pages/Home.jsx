import { useState, useEffect, useRef } from 'react';
import { SVGIcon } from '../components/SVGIcon';
import abblogo from '../assets/client-logos/ABB.png';
import AscendumLogo from '../assets/client-logos/Ascendum_Logo.png';
import axaLogo from '../assets/client-logos/AXA_Logo.png';
import bcicLogo from '../assets/client-logos/bcic.png';
import bhorukaLogo from '../assets/client-logos/bhoruka.png';
import blackNGreenLogo from '../assets/client-logos/blackngreen_logo.png';
import comvivaLogo from '../assets/client-logos/comviva.png';
import fssLogo from '../assets/client-logos/FSS.png';
import goldenPalmsLogo from '../assets/client-logos/golden-palms.png';
import investBavariaLogo from '../assets/client-logos/invest-in-bavaria.png';
import kushagramatiLogo from '../assets/client-logos/kushagramati.png';
import mobifinLogo from '../assets/client-logos/mobifin.png';
import mphasisLogo from '../assets/client-logos/mphasis.png';
import npstLogo from '../assets/client-logos/NPST.png';
import panamaxLogo from '../assets/client-logos/Panamax.png';
import panchheeLogo from '../assets/client-logos/pancheetantra.png';
import tecnotreeLogo from '../assets/client-logos/Tecnotree-logo.png';
import tessolveLogo from '../assets/client-logos/tessolve.png';
import timepayLogo from '../assets/client-logos/TimePay.png';
import toyotaLogo from '../assets/client-logos/toyota-logo.png';
import utthungaLogo from '../assets/client-logos/utthunga.png';
import zaggleLogo from '../assets/client-logos/Zaggle-logo.png';

import slide1 from '../assets/slider-images/slide1.jpeg';
import slide2 from '../assets/slider-images/slide2.jpeg';
import slide3 from '../assets/slider-images/slide3.jpeg';



import differentiator1 from '../assets/differentiators/differentiator1.png';
import differentiator2 from '../assets/differentiators/differentiator2.png';
import differentiator3 from '../assets/differentiators/differentiator3.png';


import p1 from '../assets/portfolio-preview/p1.webp';
import p2 from '../assets/portfolio-preview/p2.webp';
import p3 from '../assets/portfolio-preview/p3.webp';
import p4 from '../assets/portfolio-preview/p4.webp';
import p5 from '../assets/portfolio-preview/p5.webp';
import p6 from '../assets/portfolio-preview/p6.webp';
import p7 from '../assets/portfolio-preview/p7.webp';
import p8 from '../assets/portfolio-preview/p8.webp';
import p9 from '../assets/portfolio-preview/p9.webp';
import p10 from '../assets/portfolio-preview/p10.webp';
import p11 from '../assets/portfolio-preview/p11.webp';
import p12 from '../assets/portfolio-preview/p12.webp';

import p13 from '../assets/portfolio-preview/p13.webp';
import p14 from '../assets/portfolio-preview/p14.webp';
import p15 from '../assets/portfolio-preview/p15.webp';
import p16 from '../assets/portfolio-preview/p16.webp';
import p17 from '../assets/portfolio-preview/p17.webp';
import p18 from '../assets/portfolio-preview/p18.webp';
import p19 from '../assets/portfolio-preview/p19.webp';


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

const row1Images = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];
const row2Images = [p11,p12,p13, p14, p15, p16, p17, p18, p19];

export const Home = ({ setCurrentPage }) => {
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



  const clientLogos = [
    { name: 'ABB', logo: abblogo },
    { name: 'Ascendum', logo: AscendumLogo },
    { name: 'AXA', logo: axaLogo },
    { name: 'BCIC', logo: bcicLogo },
    { name: 'Bhoruka', logo: bhorukaLogo },
    { name: 'Black N Green', logo: blackNGreenLogo },
    { name: 'Comviva', logo: comvivaLogo },
    { name: 'FSS', logo: fssLogo },
    { name: 'Golden Palms', logo: goldenPalmsLogo },
    { name: 'Invest Bavaria', logo: investBavariaLogo },
    { name: 'Kushagramati', logo: kushagramatiLogo },
    { name: 'Mobifin', logo: mobifinLogo },
    { name: 'Mphasis', logo: mphasisLogo },
    { name: 'NPST', logo: npstLogo },
    { name: 'Panamax', logo: panamaxLogo },
    { name: 'PANCHEE TANTRA', logo: panchheeLogo },
    { name: 'Tecnotree', logo: tecnotreeLogo },
    { name: 'Tessolve', logo: tessolveLogo },
    { name: 'TimePay', logo: timepayLogo },
    { name: 'Toyota', logo: toyotaLogo },
    { name: 'Utthunga', logo: utthungaLogo },
    { name: 'Zaggle', logo: zaggleLogo }
  ];

  const visionSlides = [
  {
    image: slide1,
    quote: "Our powerful pitches Win Boardroom Decisions in favor of our clients",
  
  },
  {
    image: slide2,
    quote: "We Help Top-Notch Companies Tell Their Story Convincingly",
    
  },
  {
    image: slide3,
    quote: "We Help Clients Draw-in the Best Talent",
   
  }
];

const [currentSlide, setCurrentSlide] = useState(0);
const [visionPaused, setVisionPaused] = useState(false);

useEffect(() => {
  if (visionPaused) return;
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % visionSlides.length);
  }, 5000);
  return () => clearInterval(interval);
}, [visionPaused, currentSlide]);

  return (
    <div className="page-container">
      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-mesh"></div>
        <div className="hero-container">
          <div className="hero-badge">Greenhouse Brandworks</div>
          <h1 className="hero-headline">
            <span className="hero-word" style={{ '--i': 0 }}>We</span>{' '}
            <span className="hero-word" style={{ '--i': 1 }}>help</span>{' '}
            <span className="hero-word" style={{ '--i': 2 }}>your</span>{' '}
            <span className="hero-word hero-word--accent" style={{ '--i': 3 }}>brand</span>{' '}
            <span className="hero-word hero-word--accent" style={{ '--i': 4 }}>grow</span>
            
          </h1>
          <p className="hero-subtext hero-subtext--animate">
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

      {/* --- BRAND VISION SLIDER --- */}
      <section
        className="vision-slider"
        onMouseEnter={() => setVisionPaused(true)}
        onMouseLeave={() => setVisionPaused(false)}
      >
        <div className="vision-slider-overlay">

          <div className="vision-slider-content">
            <span className="vision-badge">OUR VISION</span>

            <h2 key={currentSlide} className="vision-quote-animate">
              {visionSlides[currentSlide].quote}
            </h2>

            <div className="vision-nav">
              <button
                className="vision-arrow"
                onClick={() => setCurrentSlide((p) => (p - 1 + visionSlides.length) % visionSlides.length)}
                aria-label="Previous slide"
              >
                &#8592;
              </button>

              <div className="vision-dots">
                {visionSlides.map((_, i) => (
                  <button
                    key={i}
                    className={`vision-dot${i === currentSlide ? ' active' : ''}`}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    {i === currentSlide && (
                      <span key={currentSlide} className={`vision-dot-fill${visionPaused ? ' paused' : ''}`} />
                    )}
                  </button>
                ))}
              </div>

              <button
                className="vision-arrow"
                onClick={() => setCurrentSlide((p) => (p + 1) % visionSlides.length)}
                aria-label="Next slide"
              >
                &#8594;
              </button>
            </div>

            <button
              className="btn btn-primary vision-btn"
              onClick={() => { setCurrentPage('about'); window.scrollTo(0, 0); }}
            >
              Learn More
            </button>
          </div>

          <div className="vision-slider-image-wrapper">
            <img
              key={currentSlide}
              src={visionSlides[currentSlide].image}
              alt={visionSlides[currentSlide].quote}
              className="vision-slider-image vision-image-animate"
            />
          </div>

        </div>
      </section>

      {/* --- SERVICES OVERVIEW --- */}
      <section className="section section-dot">
        <div className="section-container">
          <div className="section-header">
            {/* <span className="section-badge">Our Focus</span> */}
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
      {/* --- BRAND PROMISE QUOTE --- */}
<section className="brand-promise-section">
      {/* 1. This wrapper completely isolates the fade-up animation */}
      <div className="brand-promise-anim-wrap">
        
        {/* 2. The glass card stays static inside, preserving the blur perfectly */}
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

      {/* Philosophy Step Section */}
      <section className="philosophy-section">
      <div className="philosophy-container">
        
        {/* Section Heading */}
        <div className="philosophy-header">
          <span className="section-badge-text">HOW WE THINK</span>
          <h2>Our Creative Philosophy</h2>
          <p className="philosophy-subtitle">
            Get a taste of the PIE (Practice - Internalize - Extend)
          </p>
        </div>

        {/* Core Layout Split Grid */}
        <div className="philosophy-grid">
          
          {/* LEFT COLUMN: Static SVG Pie Diagram */}
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

          {/* RIGHT COLUMN: Vertically Aligned Lists using Vector Logos */}
          <div className="philosophy-list-wrapper">
            
            {/* Item 01: Practice */}
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

            {/* Item 02: Internalize */}
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

            {/* Item 03: Extend */}
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

{/* --- PORTFOLIO PREVIEW --- */}
<section className="section portfolio-marquee-section">
  <div className="section-container">
    
    {/* NEW GLASS PANEL ENCLOSING ALL SECTION CONTENT */}
    <div className="glass-showcase-card">

      {/* CENTERED HEADER CONTENT */}
      <div className="section-header centered-marquee-header">
        <span className="section-badge">Portfolio Preview</span>
        <h2>Our Gallery</h2>
        <p>Take a look at some of our work that we’ve done for our clients through the years.</p>
      </div>

      {/* The Contained Marquee Area */}
      <div className="marquee-container">
        
        {/* ROW 1: Scrolls Left */}
        <div className="marquee-row">
          <div className="marquee-track track-left">
            {row1Images.map((imgSrc, index) => (
              <div key={`r1-main-${index}`} className="marquee-card" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                <img src={imgSrc} alt={`Portfolio Asset ${index + 1}`} />
              </div>
            ))}
            {row1Images.map((imgSrc, index) => (
              <div key={`r1-dup-${index}`} className="marquee-card" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                <img src={imgSrc} alt={`Portfolio Asset ${index + 1} Duplicate`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolls Right */}
        <div className="marquee-row">
          <div className="marquee-track track-right">
            {row2Images.map((imgSrc, index) => (
              <div key={`r2-main-${index}`} className="marquee-card" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                <img src={imgSrc} alt={`Portfolio Asset ${index + 13}`} />
              </div>
            ))}
            {row2Images.map((imgSrc, index) => (
              <div key={`r2-dup-${index}`} className="marquee-card" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                <img src={imgSrc} alt={`Portfolio Asset ${index + 13} Duplicate`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER ENTER ACTION */}
      <div className="marquee-action-row">
        <button className="btn btn-secondary" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
          Enter Portfolio
        </button>
      </div>

    </div> {/* END OF GLASS PANEL */}

  </div>
</section>

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

      {/* --- CLIENT LOGO SHOWCASE TICKER --- */}
      <section className="logo-ticker">
        <div className="logo-ticker-track">
          {/* Double list for smooth infinite wrapping */}
          {clientLogos.concat(clientLogos).map((client, index) => (
            <div key={index} className="logo-ticker-item">
              <img src={client.logo} alt={client.name} className="client-logo-img"/>
              <span>{client.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="section section-dark section-cta" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-mesh" style={{ top: 'auto', bottom: '-20%', left: '20%', right: '20%' }}></div>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <span className="section-badge">Start Today</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Ready to Elevate Your Brand?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
           Ready to Elevate Your Brand?Contact us today to discover how Greenhouse Brandworks can help your business stand out.
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

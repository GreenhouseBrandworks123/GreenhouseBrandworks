import { useState, useEffect, useRef } from 'react';

import { SVGIcon } from '../components/SVGIcon';
import  clientsWall from '../assets/client-logos/clients-wall.webp';


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
const row2Images = [p11, p12, p13, p14, p15, p16, p17, p18, p19];

export const Home = ({ setCurrentPage }) => {
  // Brand Vision Slider State & Logic
  const [currentSlide, setCurrentSlide] = useState(0);
  

  const visionSlides = [
    {
      subtitle: "Our powerful pitches",
      title: "win boardroom decisions",
      highlight: "in favor of our clients",
      image: slide1
    },
    {
      subtitle: "We help top-notch companies",
      title: "tell their story",
      highlight: "convincingly",
      image: slide2
    },
    {
      subtitle: "We help clients",
      title: "draw in",
      highlight: "the best talent",
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
            <h2>What we offer</h2>
            <p>We help you connect with your prospects with a strong first impression, that sets your company apart from your competition. Check our services.</p>
          </div>

          <div className="grid-4">
            <div className="service-card">
              <div className="service-icon">
                <SVGIcon name="marketing" size={28} />
              </div>
              <h3>Digital marketing</h3>
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
              <span className="differentiators-title--plain">Our </span>
              <span className="differentiators-title--accent">differentiators</span>
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
            <h2>Our creative philosophy</h2>
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

      {/* --- PORTFOLIO PREVIEW --- */}
      <section className="section portfolio-marquee-section">
        <div className="section-container">
          <div className="glass-showcase-card">
            <div className="section-header centered-marquee-header">
              
              <h2>Our gallery</h2>
              <p>Take a look at some of our work that we’ve done for our clients through the years.</p>
            </div>

            <div className="marquee-container">
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

            <div className="marquee-action-row">
              <button className="btn btn-secondary" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                Enter portfolio
              </button>
            </div>
          </div>
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

      {/* --- CLIENT LOGO TICKER --- */}
       <section className="bg-[#151515] py-24">
      <div className="max-w-7xl mx-auto px-6">

        
        <div className="mb-12">
          <h2 className="text-6xl font-bold text-white leading-tight">
            <span className="text-[#a4d007]">Honors</span> on our wall!
          </h2>

          <p className="text-gray-300 text-2xl mt-4">
            Some of the brands we're proud to call our clients!
          </p>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl leading-relaxed">
            Over the years, we've partnered with industry leaders across
            technology, fintech, manufacturing and hospitality to create
            meaningful brand experiences and deliver measurable business
            growth.
          </p>
        </div>

       
        <div className="overflow-hidden rounded-3xl shadow-2xl border border-[#2c2c2c]">
          <img
            src={clientsWall}
            alt="Our Clients"
            className="w-full object-cover transition duration-500 hover:scale-[1.02]"
          />
        </div>

      </div>
    </section>
    </div>
  );
};

export default Home;
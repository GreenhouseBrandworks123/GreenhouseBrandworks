import { useState } from 'react';
import { SVGIcon } from './SVGIcon';
import greenhouseLogo from '../assets/greenhouse-logo.png';
import './Footer.css';

export const Footer = ({ setCurrentPage }) => {
  // NEW: State to track which mobile dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo(0, 0);
  };

  // NEW: Toggles the dropdown, but ONLY does anything on mobile screens
  const toggleDropdown = (menu) => {
    if (window.innerWidth <= 768) {
      setOpenDropdown(openDropdown === menu ? null : menu);
    }
  };

  return (
    <footer>
      <div className="section-container">
        <div className="footer-grid">
          
          {/* Brand & Socials */}
          <div className="footer-brand">
            <h3 className="logo">
              <img src={greenhouseLogo} alt="Greenhouse Brandworks logo" className="logo-img footer-logo-img" />
            </h3>
            <p>
              An award-winning creative branding and digital design agency crafting premium identities and conversion-focused experiences.
            </p>
            <div className="contact-socials">
              <a href="https://www.instagram.com/greenhousebrand/?hl=en" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <SVGIcon name="instagram" size={18} />
              </a>
              <a href="https://www.linkedin.com/company/greenhouse_brandworks/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <SVGIcon name="linkedin" size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Dropdown */}
          <div className="footer-col">
            <h4 
              className={`accordion-header ${openDropdown === 'links' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('links')}
            >
              Quick links
              <span className="dropdown-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </h4>
            <ul className={`footer-links accordion-content ${openDropdown === 'links' ? 'open' : ''}`}>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Services</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); }}>Portfolio</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About Us</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); navigateTo('careers'); }}>Careers</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact</a></li>
            </ul>
          </div>

          {/* Services Dropdown */}
          <div className="footer-col">
            <h4 
              className={`accordion-header ${openDropdown === 'services' ? 'active' : ''}`} 
              onClick={() => toggleDropdown('services')}
            >
              Our services
              <span className="dropdown-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </h4>
            <ul className={`footer-links accordion-content ${openDropdown === 'services' ? 'open' : ''}`}>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Electronic Media</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Print Media</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Digital Marketing</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Outdoor Advertising</a></li>
            </ul>
          </div>

          {/* Start a Project (Always visible) */}
          <div className="footer-col">
            <h4>Start a project</h4>
            <p style={{ marginBottom: '16px', fontSize: '0.95rem' }}>
              Have an idea? Let's create a strong brand and digital experience together.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem'
              }}
            >
              Get in Touch
              <SVGIcon name="arrowRight" size={16} />
            </a>
            <div style={{ marginTop: '18px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Available for branding, UI/UX & growth projects.</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Greenhouse Brandworks. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
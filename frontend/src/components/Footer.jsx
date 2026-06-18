import { useState } from 'react';
import { SVGIcon } from './SVGIcon';

export const Footer = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo(0, 0);
  };

  return (
    <footer>
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="logo">
              <SVGIcon name="logo" size={24} />
              Greenhouse Brandworks
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

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Services</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); }}>Portfolio</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About Us</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); navigateTo('careers'); }}>Careers</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Branding & Identity</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Website Design</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Digital Marketing</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Social Media Design</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('services'); }}>Product Video</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{ marginBottom: '16px', fontSize: '0.95rem' }}>
              Subscribe to receive insights on branding, design, and growth.
            </p>
            {subscribed ? (
              <div style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SVGIcon name="check" size={16} />
                Subscribed successfully!
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontSize: '0.9rem' }}
                />
                <button type="submit" className="btn btn-primary" aria-label="Subscribe">
                  <SVGIcon name="arrowRight" size={16} />
                </button>
              </form>
            )}
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

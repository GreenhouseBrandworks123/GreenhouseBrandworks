import { useState, useEffect } from 'react';
import { SVGIcon } from './SVGIcon';
import greenhouseLogo from '../assets/greenhouse-logo.png';

export const Header = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About Us' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
            <img
              src={greenhouseLogo}
              alt="Greenhouse Brandworks logo"
              className="logo-img" 
            />
          </a>

          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={currentPage === item.id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'none' }}
              onClick={() => navigateTo('contact')}
            >
              Get a Quote
            </button>

            <button
              className="btn-icon menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <SVGIcon name="menu" size={28} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div className="mobile-sidebar-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          
          <div className="mobile-sidebar-drawer">
            <ul className="mobile-sidebar-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={currentPage === item.id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
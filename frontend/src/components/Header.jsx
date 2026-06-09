import { useState, useEffect } from 'react';
import { SVGIcon } from './SVGIcon';

export const Header = ({ currentPage, setCurrentPage, theme, toggleTheme }) => {
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
            <SVGIcon name="logo" size={28} />
            Greenhouse Brandworks
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
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <SVGIcon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
            </button>

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

      {/* Mobile Full Screen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay">
          <button
            className="btn-icon"
            style={{ position: 'absolute', top: '30px', right: '30px', color: 'var(--text)' }}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <SVGIcon name="close" size={32} />
          </button>
          <ul className="mobile-nav-links">
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
      )}
    </>
  );
};
export default Header;

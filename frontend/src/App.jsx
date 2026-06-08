import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Theme management with local storage cache
  const [theme, setTheme] = useState(() => {
    const cached = localStorage.getItem('theme');
    if (cached) return cached;
    // Check system preference
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'services':
        return <Services setCurrentPage={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio />;
      case 'about':
        return <About />;
      case 'careers':
        return <Careers />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      {renderActivePage()}
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;

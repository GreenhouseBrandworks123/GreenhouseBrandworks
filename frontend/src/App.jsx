import { useState } from 'react';
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
  
  // State to track which category was clicked from the Services page
  const [portfolioFilter, setPortfolioFilter] = useState('electronic'); 

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'services':
        return <Services setCurrentPage={setCurrentPage} setPortfolioFilter={setPortfolioFilter} />;
      case 'portfolio':
        return <Portfolio initialFilter={portfolioFilter} />;
      case 'about':
        // FIX: Added setCurrentPage prop here
        return <About setCurrentPage={setCurrentPage} />; 
      case 'careers':
        return <Careers setCurrentPage={setCurrentPage} />;
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
      />
      
      {renderActivePage()}
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
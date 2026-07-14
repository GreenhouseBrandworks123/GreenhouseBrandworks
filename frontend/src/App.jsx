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
  
  // NEW: State to track which category was clicked from the Services page
  const [portfolioFilter, setPortfolioFilter] = useState('electronic'); 

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'services':
        // NEW: Pass setPortfolioFilter down so the button can update the state
        return <Services setCurrentPage={setCurrentPage} setPortfolioFilter={setPortfolioFilter} />;
      case 'portfolio':
        // NEW: Pass the active state down so Portfolio knows which category to open
        return <Portfolio initialFilter={portfolioFilter} />;
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
      />
      
      {renderActivePage()}
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
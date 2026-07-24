import { useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));

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
      
      <Suspense
  fallback={
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        fontSize: "18px"
      }}
    >
      Loading...
    </div>
  }
>
  {renderActivePage()}
</Suspense>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
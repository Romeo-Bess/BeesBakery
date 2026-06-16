import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import OrderOnline from './pages/OrderOnline';
import CustomOrders from './pages/CustomOrders';
import AboutBianca from './pages/AboutBianca';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';


// Scroll Restoration helper component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-primary-container/30 selection:text-[#7a5900]">
        
        {/* Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/order" element={<OrderOnline />} />
            <Route path="/custom" element={<CustomOrders />} />
            <Route path="/about" element={<AboutBianca />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback redirect */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

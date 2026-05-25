import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AmbientParticles from './components/AmbientParticles';
import Footer from './sections/Footer';

// Subpage Components
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ServicesPage from './pages/ServicesPage';
import InquirePage from './pages/InquirePage';
import AdminLogin from './pages/AdminLogin';
import AdminUpload from './pages/AdminUpload';

const ADMIN_ROUTES = ['/admin', '/admin/upload'];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function Layout({ children }) {
  const { pathname } = useLocation();
  const isAdmin = ADMIN_ROUTES.some(r => pathname.startsWith(r));
  if (isAdmin) return <>{children}</>;
  return (
    <div className="relative min-h-screen bg-matte-black text-soft-white selection:bg-gold/20 selection:text-soft-white overflow-hidden">
      <AmbientParticles />
      <Navbar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/inquire" element={<InquirePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

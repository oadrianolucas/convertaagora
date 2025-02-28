import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : 'auto';
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-black shadow-md' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter"><img src='./img/logo.png' width={180}/></Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`hover:text-gray-400 transition-colors ${location.pathname === '/' ? 'text-gray-400' : ''}`}>Início</Link>
            <Link to="/work" className={`hover:text-gray-400 transition-colors ${location.pathname === '/work' ? 'text-gray-400' : ''}`}>Trabalhos</Link>
            <Link to="/contact" className={`hover:text-gray-400 transition-colors ${location.pathname === '/contact' ? 'text-gray-400' : ''}`}>Contato</Link>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-8 text-3xl font-light">
            <Link to="/" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Início</Link>
            <Link to="/work" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Contato</Link>
            <Link to="/contact" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Contato</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
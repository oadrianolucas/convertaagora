import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Only show footer on Home and Work pages, not on Contact page
  const path = window.location.pathname;
  if (path === '/contact') {
    return null;
  }

  return (
    <footer className="py-10 bg-black border-t border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold tracking-tighter"><img src='./img/icon-white.png' width={30}/></Link>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
            <Link to="/" className="mb-4 md:mb-0 hover:text-gray-400 transition-colors">Início</Link>
            <Link to="/work" className="mb-4 md:mb-0 hover:text-gray-400 transition-colors">Trabalhos</Link>
            <Link to="/contact" className="hover:text-gray-400 transition-colors">Contato</Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 text-gray-400">©2023 Converta Agora – São Paulo/Brasil</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
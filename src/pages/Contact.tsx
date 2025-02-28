import React, { useEffect } from 'react';

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Quote Section */}
        <div className="mb-24 mt-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transformando  Ideias em Marcas <br/> de Sucesso.
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <div className="mb-8">
              <div className="w-8 h-0.5 bg-white mb-4"></div>
              <h2 className="text-2xl font-medium">Contato</h2>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-medium mb-2">Projetos e colaborações:</h3>
              <a 
                href="mailto:contato@convertaagora.com" 
                className="text-gray-500 hover:text-gray-400 transition-colors text-lg"
              >
                contato@convertaagora.com
              </a>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Social</h3>
              <div>
                <p className="text-lg mb-1">Instagram:</p>
                <a 
                  href="https://instagram.com/convertaagora" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-gray-400 transition-colors text-lg"
                >
                  @convertaagora
                </a>
              </div>
              
              <div className="mt-6">
                <p className="text-lg mb-1">Behance:</p>
                <a 
                  href="https://behance.net/convertaagora" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-gray-400 transition-colors text-lg"
                >
                  behance.net/convertaagora
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-32 pt-6 border-t border-zinc-800">
          <p className="text-right text-gray-400">©2023 Converta Agora – São Paulo/Brasil</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
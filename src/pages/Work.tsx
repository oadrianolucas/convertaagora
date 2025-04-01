import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Work: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProjects = [
    {
      id: 1,
      title: 'Artisan Bakery',
      category: 'Brand Identity',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Modern Apparel',
      category: 'Brand Strategy',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'Eco Products',
      category: 'Visual Identity',
      image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      title: 'Tech Startup',
      category: 'Brand Strategy',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 5,
      title: 'Luxury Hotel',
      category: 'Brand Identity',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 6,
      title: 'Organic Food Market',
      category: 'Visual Identity',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 7,
      title: 'Fitness Studio',
      category: 'Brand Strategy',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 8,
      title: 'Architecture Firm',
      category: 'Brand Identity',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  return (
    <div className="bg-black text-white pt-24 pb-20">
      <div className="mt-10 container mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Todos trabalhos.</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
          Cada projeto é a prova do nosso compromisso inabalável com a criação de experiências autênticas e impactantes.          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allProjects.map(project => (
            <div key={project.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-4">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  <p className="text-gray-400">{project.category}</p>
                </div>
                <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
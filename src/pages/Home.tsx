import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Artisan Bakery",
      category: "Brand Identity",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 2,
      title: "Modern Apparel",
      category: "Brand Strategy",
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 3,
      title: "Eco Products",
      category: "Visual Identity",
      image:
        "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 4,
      title: "Tech Startup",
      category: "Brand Strategy",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  const services = [
    {
      title: "Estratégia de Marca",
    },
    {
      title: "Posicionamento",
    },
    {
      title: "Naming",
    },
    {
      title: "Identidade Visual",
    },
    {
      title: "Identidade Verbal",
    },
    {
      title: "Brand Guide",
    },
    {
      title: "Logo & Signage",
    },
    {
      title: "Direção de Arte",
    },
  ];

  const clients = [
    "Spotify",
    "Nike",
    "Apple",
    "Google",
    "Airbnb",
    "Tesla",
    "Amazon",
    "Microsoft",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen flex items-center bg-black">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            A essência da <br /> sua marca.
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-10 text-gray-300">
            A Converta Agora é um estúdio de design especializado na concepção de branding e na criação de marcas, com foco na conversão e na elaboração de narrativas que potencializam o posicionamento estratégico de empresas de variados setores e dimensões.
          </p>
          <Link
            to="/work"
            className="inline-flex items-center text-lg font-medium border-b-2 border-white pb-1 hover:opacity-70 transition-opacity"
          >
            Ver todos trabalhos <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16">Trabalhos / Portfólio </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.slice(0, 4).map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-medium">{project.title}</h3>
                    <p className="text-gray-400">{project.category}</p>
                  </div>
                  <ArrowUpRight
                    size={24}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/work"
              className="inline-flex items-center text-lg font-medium border-b-2 border-white pb-1 hover:opacity-70 transition-opacity"
            >
              Ver todos trabalhos <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-16">
                Clientes selecionados{" "}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {clients.map((client, index) => (
                <div key={index} className="flex items-center justify-center">
                  <span className="text-2xl font-medium text-gray-500 hover:text-white transition-colors">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-16">Todos serviços</h2>
            </div>
            <div>
              {services.map((service, index) => (
                <div
                  key={index}
                  className="border-t border-zinc-700 group cursor-pointer"
                >
                  <h3 className="text-2xl font-medium py-4 group-hover:text-gray-300 transition-colors">
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

"use client"

import dynamic from "next/dynamic"
import { Suspense, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Code, Smartphone, Brain, Monitor, Palette, ArrowDown, MessageSquare } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false })

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showMainContent, setShowMainContent] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showFixedNav, setShowFixedNav] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hasNavigated, setHasNavigated] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Verificar se o usuário já navegou pelo menu
    const hasNavigatedBefore = sessionStorage.getItem("hasNavigated") === "true"

    if (hasNavigatedBefore) {
      setHasNavigated(true)
      setShowMainContent(true)
      setShowFixedNav(true)
    }

    const loadingTimer = setTimeout(
      () => {
        setIsLoading(false)
      },
      hasNavigatedBefore ? 1000 : 2500,
    )

    return () => {
      clearTimeout(loadingTimer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Marcar que o usuário navegou pelo menu
    setHasNavigated(true)
    sessionStorage.setItem("hasNavigated", "true")

    // Mostrar conteúdo principal imediatamente
    setShowMainContent(true)
    setShowFixedNav(true)
  }

  const handleTransition = () => {
    setIsTransitioning(true)

    // Marcar que o usuário viu a transição
    sessionStorage.setItem("hasNavigated", "true")

    setTimeout(() => {
      setShowMainContent(true)
      setShowFixedNav(true)
    }, 1000)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 border-2 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    )
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Converta Agora - Home",
              description: "Página inicial da Converta Agora, agência de tecnologia e inovação digital",
              url: "https://convertaagora.com",
              mainEntity: {
                "@type": "Organization",
                name: "Converta Agora",
              },
            }),
          }}
        />
      </Head>

      <div className="bg-black text-white overflow-hidden">
        {/* Fixed Navigation */}
        <Navigation currentPage="home" onHomeClick={scrollToTop} showFixedNav={showFixedNav} />

        {/* Hero Section with Globe */}
        <AnimatePresence>
          {!showMainContent && !hasNavigated && (
            <motion.section
              className="relative min-h-screen"
              id="hero"
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
            >
              <Suspense fallback={<div className="min-h-screen bg-black" />}>
                <Globe />
              </Suspense>

              {/* Hero Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <motion.div
                  className="text-center max-w-4xl px-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <motion.h1
                    className="text-white text-2xl md:text-4xl lg:text-5xl font-light mb-8 md:mb-12 tracking-wide leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    Onde tecnologia de ponta encontra visão de negócios.
                  </motion.h1>

                  <motion.p
                    className="text-white/60 text-sm md:text-base font-light mb-12 md:mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    Explore nossa essência
                  </motion.p>

                  {/* Transition Button */}
                  <motion.div
                    className="pointer-events-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                  >
                    <motion.button
                      onClick={handleTransition}
                      className="group relative overflow-hidden border border-white/30 px-8 md:px-12 py-4 md:py-5 hover:border-white transition-all duration-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isTransitioning}
                      aria-label="Descobrir mais sobre a Converta Agora"
                    >
                      {/* Button background effect */}
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />

                      <span className="relative z-10 flex items-center gap-3 font-light tracking-wide text-white">
                        <span className="text-sm md:text-base">Descobrir Mais</span>
                        <ArrowRight
                          size={isMobile ? 16 : 20}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                          aria-hidden="true"
                        />
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Animated hint */}
                  <motion.div
                    className="mt-8 md:mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                    aria-hidden="true"
                  >
                    <motion.div
                      className="flex flex-col items-center gap-2"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-white/30 rounded-full"
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Transition Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence>
          {showMainContent && (
            <motion.main
              className="relative z-10 bg-black"
              id="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: hasNavigated ? 0.5 : 1, delay: hasNavigated ? 0 : 0.5 }}
            >
              {/* Technology & Innovation Section */}
              <section
                className={`min-h-screen flex items-center justify-center px-4 md:px-6 py-16 md:py-20 ${showFixedNav ? "pt-24 md:pt-28" : ""}`}
                aria-labelledby="technology-heading"
              >
                <div className="text-center max-w-5xl">
                  <motion.h1
                    id="technology-heading"
                    className="text-4xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: hasNavigated ? 0.2 : 0.3 }}
                  >
                    Tecnologia
                    <br />
                    <span className="italic font-extralight text-white/80">& Inovação</span>
                  </motion.h1>

                  <motion.p
                    className="text-base md:text-lg lg:text-xl font-light text-white/60 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: hasNavigated ? 0.4 : 0.6 }}
                  >
                    Transformamos ideias em soluções digitais de alta performance, excelência em design e foco absoluto
                    em performance estratégica
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: hasNavigated ? 0.6 : 0.9 }}
                  >
                    <Link href="/contato" aria-label="Iniciar projeto com a Converta Agora">
                      <motion.button
                        className="group flex items-center gap-2 border border-white px-6 md:px-8 py-3 hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-light tracking-wide">Iniciar Projeto</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </section>

              {/* About Section */}
              <section className="py-16 md:py-20 px-4 md:px-6 border-t border-white/10" aria-labelledby="about-heading">
                <div className="container mx-auto max-w-6xl">
                  {/* Nossa Essência */}
                  <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 md:mb-8">
                      Nossa Essência
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-white/70 font-light leading-relaxed text-sm md:text-base">
                      <p>
                        <strong className="text-white font-normal">Converta Agora</strong> é uma agência de tecnologia e
                        inovação digital, fundada em 2022, com o propósito de entregar soluções de altíssimo padrão,
                        unindo performance estratégica, design de excelência e tecnologia de ponta.
                      </p>
                      <p>
                        Somos especialistas em conceber e desenvolver produtos digitais sob medida para marcas que
                        exigem sofisticação, inteligência técnica e diferenciação competitiva real.
                      </p>
                      <p>
                        Atuamos na interseção entre tecnologia de ponta e visão de negócios, criando experiências que
                        elevam o posicionamento de mercado e impulsionam resultados concretos.
                      </p>
                    </div>
                  </motion.div>

                  {/* Modelo de Criação de Inovação */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-light mb-10 md:mb-14 text-white">
                      Modelo de Criação
                      <br />
                      <span className="italic font-extralight text-white/80">de Inovação</span>
                    </h3>

                    <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
                      {[
                        { step: "01", title: "Brainstorm", desc: "Ideação e exploração criativa" },
                        { step: "02", title: "Definição das Regras de Negócio", desc: "Estruturação estratégica" },
                        { step: "03", title: "Melhor Custo-Benefício", desc: "Otimização de recursos" },
                        {
                          step: "04",
                          title: "Prototipagem e Experiência do Usuário (UX/UI)",
                          desc: "Design centrado no usuário",
                        },
                        { step: "05", title: "Desenvolvimento Tecnológico", desc: "Implementação técnica" },
                        { step: "06", title: "Validação, Testes e Ajustes", desc: "Refinamento e qualidade" },
                        {
                          step: "07",
                          title: "Entrega, Onboarding e Monitoramento",
                          desc: "Lançamento e acompanhamento",
                        },
                        { step: "08", title: "Evolução Contínua", desc: "Melhoria permanente" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.step}
                          className="group relative"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-start gap-5 md:gap-6 p-5 md:p-8 border border-white/10 hover:border-white/30 transition-all duration-300 group-hover:bg-white/5 text-left rounded-sm">
                            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 border border-white/40 rounded-full flex items-center justify-center text-base md:text-xl font-light text-white/70 group-hover:border-white/60 group-hover:text-white transition-all">
                              {item.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg md:text-xl lg:text-2xl font-light text-white mb-3 group-hover:text-white transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-base md:text-lg text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          {index < 7 && (
                            <div className="flex justify-center py-3 md:py-4" aria-hidden="true">
                              <ArrowDown
                                size={20}
                                className="text-white/30 md:w-6 md:h-6 group-hover:text-white/50 transition-colors"
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Clients Section */}
              <section
                className="py-16 md:py-20 px-4 md:px-6 border-t border-white/10"
                aria-labelledby="clients-heading"
              >
                <div className="container mx-auto max-w-6xl">
                  <motion.div
                    className="mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 id="clients-heading" className="text-3xl md:text-4xl lg:text-5xl font-light mb-4">
                      Clientes
                      <br />
                      <span className="italic font-extralight text-white/80">Selecionados</span>
                    </h2>
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8" role="list">
                    {[
                      {
                        id: 1,
                        img: "prancheta 1.png",
                      },
                      {
                        id: 2,
                        img: "prancheta 2.png",
                      },
                      {
                        id: 3,
                        img: "prancheta 3.png",
                      },
                      {
                        id: 4,
                        img: "prancheta 4.png",
                      },
                      {
                        id: 5,
                        img: "prancheta 6.png",
                      },
                    ].map((client, index) => (
                      <img className="w-32" src={client.img} key={client.id} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Awards Section */}
              <section
                className="py-16 md:py-20 px-4 md:px-6 border-t border-white/10"
                aria-labelledby="awards-heading"
              >
                <div className="container mx-auto max-w-6xl">
                  <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h2 id="awards-heading" className="text-3xl md:text-4xl lg:text-5xl font-light mb-8">
                      Prêmios
                      <br />
                      <span className="italic font-extralight text-white/80">& Reconhecimentos</span>
                    </h2>
                  </motion.div>

                  <div className="max-w-4xl mx-auto">
                    <motion.article
                      className="group border border-white/10 hover:border-white/20 transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                          {/* Award Icon */}
                          <motion.div
                            className="flex-shrink-0"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            aria-hidden="true"
                          >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center group-hover:bg-white/90 transition-colors">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-black">
                                <path
                                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          </motion.div>

                          {/* Award Content */}
                          <div className="flex-1">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.5 }}
                              viewport={{ once: true }}
                            >
                              <div className="mb-3">
                                <time
                                  className="inline-block px-3 py-1 border border-white/20 text-white/60 text-xs font-light"
                                  dateTime="2024"
                                >
                                  2023
                                </time>
                              </div>

                              <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                                Vencedores do Desafio Brasilseg
                              </h3>

                              <p className="text-white/60 font-light leading-relaxed mb-4 text-sm md:text-base">
                                Em parceria com a <strong className="text-white/80 font-normal">bbchains</strong>,
                                conquistamos o primeiro lugar no desafio de inovação do setor de seguros, desenvolvendo
                                soluções disruptivas para o mercado brasileiro.
                              </p>

                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                                <motion.a
                                  href="https://materiais.distrito.me/report/desafio-corda-challenge"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/link inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-light"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  aria-label="Ver relatório completo do Desafio Brasilseg (abre em nova aba)"
                                >
                                  <span>Ver relatório completo</span>
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="group-hover/link:translate-x-1 transition-transform"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M7 17L17 7M17 7H7M17 7V17"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </motion.a>

                                <div
                                  className="flex items-center gap-2 text-xs text-white/40"
                                  aria-label="Parceria com bbchains"
                                >
                                  <span aria-hidden="true">•</span>
                                  <span>Parceria bbchains</span>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </div>
                </div>
              </section>

              {/* Services Section */}
              <section className="py-16 md:py-20 px-4 md:px-6 bg-white/5" aria-labelledby="services-heading">
                <div className="container mx-auto max-w-6xl">
                  <motion.h2
                    id="services-heading"
                    className="text-3xl md:text-4xl lg:text-5xl font-light mb-12 md:mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    Nossas Entregas
                  </motion.h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" role="list">
                    {[
                      {
                        icon: Code,
                        title: "Plataformas SaaS",
                        desc: "Aplicativos personalizados e plataformas sob medida",
                      },
                      {
                        icon: Monitor,
                        title: "E-commerces Premium",
                        desc: "Websites orientados à conversão e performance",
                      },
                      {
                        icon: Brain,
                        title: "IA, IoT e Web3",
                        desc: "Integrações com tecnologias emergentes",
                      },
                      {
                        icon: Smartphone,
                        title: "Totens Interativos",
                        desc: "Dispositivos físicos com interface digital",
                      },
                      {
                        icon: MessageSquare,
                        title: "Chatbots",
                        desc: "Assistentes virtuais inteligentes e personalizados",
                      },
                      {
                        icon: Palette,
                        title: "Branding Tecnológico",
                        desc: "Identidade visual com DNA tecnológico",
                      },
                    ].map((service, index) => (
                      <motion.div
                        key={service.title}
                        className="group p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        role="listitem"
                      >
                        <div className="mb-3 md:mb-4" aria-hidden="true">
                          <service.icon
                            size={isMobile ? 24 : 32}
                            className="text-white/40 group-hover:text-white transition-colors duration-300"
                            strokeWidth={1}
                          />
                        </div>
                        <h3 className="text-base md:text-lg font-light mb-2 md:mb-3 text-white">{service.title}</h3>
                        <p className="text-white/60 font-light leading-relaxed text-sm">{service.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Value Proposition Section */}
              <section className="py-16 md:py-20 px-4 md:px-6 border-t border-white/10" aria-labelledby="value-heading">
                <div className="container mx-auto max-w-4xl text-center">
                  <motion.h2
                    id="value-heading"
                    className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    Mais que uma <span className="italic font-extralight text-white/80">software house</span> —{" "}
                    <br className="hidden md:block" />
                    somos o elo entre inovação tecnológica e{" "}
                    <span className="italic font-extralight text-white/80">resultados reais</span> no seu faturamento.
                  </motion.h2>
                </div>
              </section>

              {/* Footer */}
              <Footer />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

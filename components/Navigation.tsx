"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface NavigationProps {
  currentPage?: "home" | "contato"
  onHomeClick?: () => void
  showFixedNav?: boolean
}

export default function Navigation({ currentPage = "home", onHomeClick, showFixedNav = true }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleHomeClick = () => {
    setIsMobileMenuOpen(false)
    if (onHomeClick) {
      onHomeClick()
    }
  }

  const handleContactClick = () => {
    setIsMobileMenuOpen(false)
  }

  if (!showFixedNav) return null

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <motion.div
          className="text-xl md:text-2xl font-light tracking-wide cursor-pointer"
          onClick={currentPage === "home" ? onHomeClick : undefined}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          role="button"
          tabIndex={0}
          aria-label={currentPage === "home" ? "Ir para o início da página" : "Voltar para página inicial"}
        >
          <Link href="/" aria-label="Voltar para página inicial">
              <img className="w-28" src="logo.png" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {currentPage === "home" ? (
            <motion.button
              onClick={handleHomeClick}
              className="text-sm font-light tracking-wide text-white/60 hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Ir para início"
            >
              Início
            </motion.button>
          ) : (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link
                href="/"
                className="text-sm font-light tracking-wide text-white/60 hover:text-white transition-colors"
                aria-label="Ir para página inicial"
              >
                Início
              </Link>
            </motion.div>
          )}

          {currentPage === "contato" ? (
            <motion.span
              className="text-sm font-light tracking-wide text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              aria-current="page"
            >
              Contato
            </motion.span>
          ) : (
            <Link
              href="/contato"
              className="text-sm font-light tracking-wide text-white/60 hover:text-white transition-colors"
              aria-label="Ir para página de contato"
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="block">
                Contato
              </motion.span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-black backdrop-blur-md border-b border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            role="menu"
          >
            <div className="px-4 py-6 space-y-4">
              {currentPage === "home" ? (
                <motion.button
                  onClick={handleHomeClick}
                  className="block w-full text-left py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 transition-all rounded-lg"
                  whileTap={{ scale: 0.98 }}
                  role="menuitem"
                  aria-label="Ir para início"
                >
                  <span className="text-base font-light tracking-wide">Início</span>
                </motion.button>
              ) : (
                <Link href="/" onClick={handleHomeClick} role="menuitem">
                  <motion.div
                    className="block w-full py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 transition-all rounded-lg"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-base font-light tracking-wide">Início</span>
                  </motion.div>
                </Link>
              )}

              {currentPage === "contato" ? (
                <motion.div
                  className="block w-full py-3 px-4 text-white transition-all rounded-lg"
                  role="menuitem"
                  aria-current="page"
                >
                  <span className="text-base font-light tracking-wide">Contato</span>
                </motion.div>
              ) : (
                <Link href="/contato" onClick={handleContactClick} role="menuitem">
                  <motion.div
                    className="block w-full py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 transition-all rounded-lg"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-base font-light tracking-wide">Contato</span>
                  </motion.div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ScrollIndicator() {
  const handleClick = () => {
    // Scroll para a primeira seção de conteúdo
    const mainSection = document.getElementById("main")
    if (mainSection) {
      mainSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <motion.div
        className="text-center max-w-4xl px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.h1
          className="text-white text-2xl md:text-4xl lg:text-5xl font-light mb-16 tracking-wide leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Onde tecnologia de ponta encontra visão de negócios.
        </motion.h1>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center cursor-pointer group pointer-events-auto"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.p
            className="text-white/60 text-sm font-light mb-4 group-hover:text-white transition-colors"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Explore nossa essência
          </motion.p>

          <motion.div
            className="relative"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.div
              className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center group-hover:border-white/60 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-1 h-3 bg-white/40 rounded-full mt-2 group-hover:bg-white/80 transition-colors"
                animate={{
                  height: [12, 8, 12],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-4"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
          >
            <ChevronDown
              size={24}
              className="text-white/40 group-hover:text-white/80 transition-colors"
              strokeWidth={1}
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-1 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-white/30 rounded-full mx-auto"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2 + 0.5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

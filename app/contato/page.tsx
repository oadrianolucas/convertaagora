"use client"

import { useState } from "react"
import Head from "next/head"
import { motion } from "framer-motion"
import { Mail, MapPin, Instagram, ExternalLink } from "lucide-react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
    whatsapp: "",
  })

  const [resultMessage, setResultMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target

  const formatPhone = (v: string) =>
      v
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")

    setFormData({
      ...formData,
      [name]: name === "whatsapp" ? formatPhone(value) : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResultMessage("Enviando...")

    const data = new FormData(e.currentTarget)
    data.append("access_key", "e5b3219d-6808-478b-a98f-eaddd22b55cf")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    })

    const result = await response.json()

    if (result.success) {
      setResultMessage("Mensagem enviada com sucesso!")
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" })
    } else {
      console.error(result)
      setResultMessage("Ocorreu um erro. Tente novamente.")
    }
  }

  return (
    <>
      <Head>
        <title>Contato | Converta Agora - Agência de Tecnologia</title>
        <meta name="description" content="Entre em contato com a Converta Agora." />
        <link rel="canonical" href="https://convertaagora.com/contato" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage="contato" />

        <main className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Info */}
              <motion.section
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-6xl font-light mb-8">
                  Vamos <br />
                  <span className="italic font-extralight text-white/80">Conversar</span>
                </h1>
                <p className="text-lg text-white/60 font-light mb-12">
                  Projetos e colaborações começam com uma conversa. Conte-nos sobre sua visão.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <Mail size={20} className="text-white/40 group-hover:text-white transition-colors" />
                    <a
                      href="mailto:contato@convertaagora.com"
                      className="font-light text-white/80 hover:text-white transition-colors"
                    >
                      contato@convertaagora.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <MapPin size={20} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="font-light text-white/80">São Paulo, Brasil</span>
                  </div>
                </div>

                <section className="mt-12 pt-8 border-t border-white/10">
                  <h2 className="text-lg font-light mb-6 text-white/80">Social</h2>
                  <a
                    href="https://instagram.com/convertaagora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group text-white/60 hover:text-white transition-colors"
                  >
                    <Instagram size={18} className="group-hover:text-white transition-colors" />
                    <span className="font-light">@convertaagora</span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </section>
              </motion.section>

              {/* Form */}
              <motion.section
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="from_name" value="Converta Agora Site" />
                  <input type="hidden" name="subject" value={formData.assunto || "Nova mensagem do site"} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-light text-white/60 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-white/20 px-4 py-3 font-light focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-light text-white/60 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-white/20 px-4 py-3 font-light focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-light text-white/60 mb-2">
                        WhatsApp *
                      </label>
                      <input
                        type="text"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-white/20 px-4 py-3 font-light focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="assunto" className="block text-sm font-light text-white/60 mb-2">
                        Assunto *
                      </label>
                      <input
                        type="text"
                        id="assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-white/20 px-4 py-3 font-light focus:border-white outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-light text-white/60 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="w-full bg-transparent border border-white/20 px-4 py-3 font-light focus:border-white outline-none resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full border border-white px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 font-light tracking-wide"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enviar Mensagem
                  </motion.button>

                  {resultMessage && (
                    <p className="text-sm text-white/60 pt-2 transition-opacity">{resultMessage}</p>
                  )}
                </form>
              </motion.section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

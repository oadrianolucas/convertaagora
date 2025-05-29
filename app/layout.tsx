import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Converta Agora | Agência de Tecnologia e Inovação Digital",
  description:
    "Transformamos ideias em soluções digitais de alta performance. Especialistas em desenvolvimento de plataformas SaaS, e-commerces premium, IA, IoT e Web3. Fundada em 2022, unimos tecnologia de ponta com visão de negócios para resultados reais.",
  keywords: [
    "agência de tecnologia",
    "desenvolvimento de software",
    "inovação digital",
    "plataformas SaaS",
    "e-commerce premium",
    "inteligência artificial",
    "IoT",
    "Web3",
    "chatbots",
    "desenvolvimento web",
    "aplicativos personalizados",
    "transformação digital",
    "startup",
    "tecnologia",
    "São Paulo",
    "Brasil",
  ],
  authors: [{ name: "Converta Agora" }],
  creator: "Converta Agora",
  publisher: "Converta Agora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://convertaagora.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Converta Agora | Agência de Tecnologia e Inovação Digital",
    description:
      "Transformamos ideias em soluções digitais de alta performance. Especialistas em desenvolvimento de plataformas SaaS, e-commerces premium, IA, IoT e Web3.",
    url: "https://convertaagora.com",
    siteName: "Converta Agora",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Converta Agora - Tecnologia e Inovação Digital",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Converta Agora | Agência de Tecnologia e Inovação Digital",
    description:
      "Transformamos ideias em soluções digitais de alta performance. Especialistas em desenvolvimento de plataformas SaaS, e-commerces premium, IA, IoT e Web3.",
    images: ["/og-image.jpg"],
    creator: "@convertaagora",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Converta Agora",
              description:
                "Agência de tecnologia e inovação digital especializada em desenvolvimento de soluções digitais de alta performance",
              url: "https://convertaagora.com",
              logo: "https://convertaagora.com/logo.png",
              foundingDate: "2022",
              address: {
                "@type": "PostalAddress",
                addressLocality: "São Paulo",
                addressCountry: "BR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "contato@convertaagora.com",
                contactType: "customer service",
              },
              sameAs: ["https://instagram.com/convertaagora", "https://behance.net/convertaagora"],
              services: [
                "Desenvolvimento de Plataformas SaaS",
                "E-commerces Premium",
                "Inteligência Artificial",
                "IoT",
                "Web3",
                "Chatbots",
                "Branding Tecnológico",
              ],
              award: [
                {
                  "@type": "Award",
                  name: "Vencedores do Desafio Brasilseg",
                  dateReceived: "2023",
                  description: "Primeiro lugar no desafio de inovação do setor de seguros em parceria com bbchains",
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

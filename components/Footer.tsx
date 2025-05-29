"use client"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 md:py-12 px-4 md:px-6" role="contentinfo">
      <div className="container mx-auto text-center">
        <p className="text-white/40 font-light text-xs md:text-sm tracking-wide">
          © {new Date().getFullYear()} Converta Agora. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

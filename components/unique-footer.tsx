"use client"

import { Github, Twitter, MessageCircle } from "lucide-react"

export function UniqueFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="flex flex-col items-end text-right">
            <div className="mb-2">
              <span className="text-xl sm:text-2xl font-bold text-white">
                byte<span className="text-cyan-400">TECH</span>
              </span>
              <div className="text-xs text-slate-500 font-mono">v1.0.0</div>
            </div>
            <p className="text-slate-400 font-mono text-xs sm:text-sm leading-relaxed">
              // Plataforma de aprendizaje tecnológico
              <br />
              // Construyendo el futuro, una línea de código a la vez
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-mono font-semibold mb-4 text-sm sm:text-base">./links</h3>
            <div className="space-y-2 font-mono text-xs sm:text-sm">
              <a href="#" className="block text-slate-400 hover:text-cyan-400 transition-colors py-1">
                → cursos/
              </a>
              <a href="#" className="block text-slate-400 hover:text-cyan-400 transition-colors py-1">
                → nosotros/
              </a>
              <a href="#" className="block text-slate-400 hover:text-cyan-400 transition-colors py-1">
                → soporte/
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 sm:pt-6 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-xs sm:text-sm font-mono text-center sm:text-left">
            © 2025 byteTECH --version 1.0.0
          </div>
          <div className="flex items-center space-x-4">
            <Github className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors" />
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 hover:text-green-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}

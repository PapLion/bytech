"use client"

import Link from "next/link"
import { Terminal, Github, Twitter, Linkedin, Mail } from "lucide-react"

export function UniqueFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-mono">
                byte<span className="text-cyan-400">TECH</span>
              </span>
            </div>
            <p className="text-slate-400 font-mono text-sm mb-4">
              // Plataforma de aprendizaje
              <br />
              // para desarrolladores
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-mono font-semibold text-white mb-4">./empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nosotros"
                  className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/soporte"
                  className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors"
                >
                  Soporte
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-500 font-mono text-sm">© 2024 byteTECH. Todos los derechos reservados.</p>
            <p className="text-slate-500 font-mono text-sm mt-2 sm:mt-0">Hecho con ❤️ para desarrolladores</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

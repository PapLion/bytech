import { UniqueHeader } from "@/bytech/components/unique-header"
import { UniqueFooter } from "@/bytech/components/unique-footer"
import { Button } from "@/bytech/components/ui/button"
import { Input } from "@/bytech/components/ui/input"
import { Textarea } from "@/bytech/components/ui/textarea"
import {
  Terminal,
  Mail,
  MessageCircle,
  Github,
  HelpCircle,
  Book,
  Video,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react"

export default function SoportePage() {
  return (
    <div className="min-h-screen bg-dynamic-gradient">
      <UniqueHeader />

      {/* Hero Section */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-full px-4 py-2 mb-8">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-mono">./support --help</span>
            </div>

            <h1 className="font-mono font-bold leading-tight text-white text-3xl sm:text-4xl md:text-6xl mb-6">
              {">"} Centro de <span className="text-cyan-400">Soporte</span>
            </h1>

            <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-2xl mx-auto border border-slate-800 text-left font-mono text-xs sm:text-sm space-y-2">
              <p className="text-green-400">
                <span className="text-slate-500">$</span> help --available
              </p>
              <p className="text-slate-400 ml-2">✓ Soporte técnico 24/7</p>
              <p className="text-slate-400 ml-2">✓ Documentación completa</p>
              <p className="text-slate-400 ml-2">✓ Comunidad activa</p>
              <p className="text-cyan-400 ml-2">¡Estamos aquí para ayudarte! 🚀</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transición suave */}
      <div className="section-transition-up"></div>

      {/* Opciones de Soporte */}
      <section className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/3 via-transparent to-blue-900/3" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">¿Cómo podemos ayudarte?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* FAQ */}
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-400/50 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-mono">Preguntas Frecuentes</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros cursos y plataforma.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 font-mono bg-transparent"
                >
                  Ver FAQ
                </Button>
              </div>

              {/* Documentación */}
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-green-400/50 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-mono">Documentación</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Guías detalladas, tutoriales y recursos para aprovechar al máximo tu experiencia de aprendizaje.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 font-mono bg-transparent"
                >
                  Ver Docs
                </Button>
              </div>

              {/* Video Tutoriales */}
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-purple-400/50 transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-mono">Video Tutoriales</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Aprende visualmente con nuestros tutoriales en video sobre cómo usar la plataforma.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 font-mono bg-transparent"
                >
                  Ver Videos
                </Button>
              </div>
            </div>

            {/* Estado del Sistema */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white font-mono">Estado del Sistema</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-mono text-sm">Plataforma</div>
                    <div className="text-green-400 text-xs font-mono">Operacional</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-mono text-sm">Videos</div>
                    <div className="text-green-400 text-xs font-mono">Operacional</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-white font-mono text-sm">API</div>
                    <div className="text-yellow-400 text-xs font-mono">Mantenimiento</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transición suave */}
      <div className="section-transition-down"></div>

      {/* Formulario de Contacto */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-purple-900/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">Contáctanos Directamente</h2>
              </div>
              <p className="text-slate-400 font-mono">// ¿No encontraste lo que buscabas? ¡Escríbenos!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulario */}
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">~/support/ticket.js</span>
                  </div>
                </div>

                <form className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-mono text-slate-300 mb-2">
                      <span className="text-cyan-400">const</span> nombre =
                    </label>
                    <Input
                      placeholder="Tu nombre completo"
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-slate-300 mb-2">
                      <span className="text-cyan-400">const</span> email =
                    </label>
                    <Input
                      type="email"
                      placeholder="ejemplo@email.com"
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-slate-300 mb-2">
                      <span className="text-cyan-400">const</span> categoria =
                    </label>
                    <select className="w-full bg-slate-800/50 border border-slate-700 text-white font-mono rounded-md px-3 py-2 text-sm">
                      <option value="">Selecciona una categoría</option>
                      <option value="tecnico">Problema Técnico</option>
                      <option value="curso">Pregunta sobre Curso</option>
                      <option value="pago">Problema de Pago</option>
                      <option value="cuenta">Problema de Cuenta</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-slate-300 mb-2">
                      <span className="text-cyan-400">const</span> prioridad =
                    </label>
                    <select className="w-full bg-slate-800/50 border border-slate-700 text-white font-mono rounded-md px-3 py-2 text-sm">
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-slate-300 mb-2">
                      <span className="text-cyan-400">const</span> descripcion =
                    </label>
                    <Textarea
                      placeholder="Describe tu problema o pregunta en detalle..."
                      rows={4}
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 font-mono resize-none"
                    />
                  </div>

                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-lg">
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Ticket de Soporte
                  </Button>

                  <div className="text-xs font-mono text-slate-500 text-center">
                    // Tiempo de respuesta promedio: 2-4 horas
                  </div>
                </form>
              </div>

              {/* Info de contacto y horarios */}
              <div className="space-y-6">
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 font-mono">Canales de Soporte</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-mono text-sm">Email</div>
                        <div className="text-slate-400 text-sm">soporte@bytetech.dev</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white font-mono text-sm">Telegram</div>
                        <div className="text-slate-400 text-sm">@byteTECH_support</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-mono text-sm">Comunidad</div>
                        <div className="text-slate-400 text-sm">Discord byteTECH</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                        <Github className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-white font-mono text-sm">GitHub Issues</div>
                        <div className="text-slate-400 text-sm">github.com/byteTECH</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 font-mono">Horarios de Atención</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-mono text-sm">Lunes - Viernes:</span>
                          <span className="text-white font-mono text-sm">9:00 - 18:00</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-mono text-sm">Sábados:</span>
                          <span className="text-white font-mono text-sm">10:00 - 14:00</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-mono text-sm">Domingos:</span>
                          <span className="text-slate-500 font-mono text-sm">Cerrado</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                    <div className="text-xs font-mono text-slate-400">
                      <span className="text-green-400">// Nota:</span> Para problemas urgentes, usa Telegram para
                      respuesta más rápida
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 font-mono">Tiempos de Respuesta</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-mono">Baja prioridad:</span>
                      <span className="text-white font-mono">24-48h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-mono">Media prioridad:</span>
                      <span className="text-white font-mono">4-8h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-mono">Alta prioridad:</span>
                      <span className="text-cyan-400 font-mono">2-4h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-mono">Urgente:</span>
                      <span className="text-red-400 font-mono">{"<"}1h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UniqueFooter />
    </div>
  )
}

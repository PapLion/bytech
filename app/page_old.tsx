"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, User, Terminal, Code, Zap } from "lucide-react"
import Link from "next/link"

interface Course {
  id: number
  sensei_id: number
  name: string
  description: string
  hours: number
  miniature_id: string
  price: number
  sensei_name: string
  lessons_count: number
  progress: number
}

interface MyCoursesResponse {
  is_sensei: boolean
  courses: Course[]
}

const API_BASE = "http://127.0.0.1:8000/api"

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSensei, setIsSensei] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadMyCourses()
  }, [])

  const loadMyCourses = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/courses/my_courses`, {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/login")
          return
        }
        throw new Error("Failed to load courses")
      }

      const data: MyCoursesResponse = await response.json()
      setCourses(data.courses)
      setIsSensei(data.is_sensei)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading courses")
    } finally {
      setLoading(false)
    }
  }

  const handleCourseClick = (courseId: number) => {
    router.push(`/course/${courseId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dynamic-gradient flex items-center justify-center">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono">Cargando tus cursos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dynamic-gradient flex items-center justify-center">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-red-800 rounded-xl p-8 text-center">
          <p className="text-red-400 font-mono">{error}</p>
          <Button onClick={loadMyCourses} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-mono">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dynamic-gradient">
      {/* Header único con terminal */}
      <header className="bg-slate-950/90 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-3 transition-transform">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  byte<span className="text-cyan-400">TECH</span>
                </span>
                <span className="text-xs text-slate-500 font-mono hidden sm:block">v1.0.0</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {isSensei && (
                <Button
                  variant="outline"
                  onClick={() => router.push("/workbench")}
                  className="border-slate-700 text-slate-300 font-mono hover:bg-slate-800 bg-transparent"
                >
                  <User className="w-4 h-4 mr-2" />
                  Workbench
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => router.push("/auth/logout")}
                className="border-slate-700 text-slate-300 font-mono hover:bg-slate-800 bg-transparent"
              >
                Cerrar Sesión
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-full px-4 py-2 mb-8">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-mono">Estado del Sistema: online</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            <h1 className="font-mono font-bold leading-tight text-white text-3xl sm:text-4xl md:text-6xl mb-6">
              {">"} byte<span className="text-cyan-400">TECH</span>
              <br />
              <span className="text-slate-400 text-xl sm:text-2xl md:text-4xl">dashboard --user</span>
            </h1>

            <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-2xl mx-auto border border-slate-800 text-left font-mono text-xs sm:text-sm space-y-2">
              <p className="text-green-400">
                <span className="text-slate-500">$</span> ls ./my-courses
              </p>
              <p className="text-slate-400 ml-2">✓ {courses.length} cursos encontrados</p>
              <p className="text-slate-400 ml-2">✓ Dashboard cargado correctamente</p>
              <p className="text-cyan-400 ml-2">¡Continúa tu aprendizaje! 🚀</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transición suave */}
      <div className="section-transition-up"></div>

      {/* Main Content */}
      <main className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/3 via-transparent to-blue-900/3" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <header className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 sm:mb-12">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500">
              <Zap className="h-5 w-5 text-black" />
            </span>
            <div className="flex-1">
              <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white">./my-courses</h2>
              <p className="text-slate-400 font-mono text-sm sm:text-base mt-1">
                //{" "}
                {courses.length === 0
                  ? "No tienes cursos disponibles aún."
                  : `Tienes ${courses.length} curso${courses.length !== 1 ? "s" : ""} disponible${courses.length !== 1 ? "s" : ""}.`}
              </p>
            </div>
          </header>

          {courses.length === 0 ? (
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-mono font-bold text-white mb-2">No hay cursos disponibles</h3>
              <p className="text-slate-400 font-mono mb-6">Explora nuestro catálogo y comienza tu aprendizaje</p>
              <Button
                onClick={() => router.push("/courses")}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-mono"
              >
                <Code className="w-4 h-4 mr-2" />
                Explorar Cursos
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {/* Terminal header */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Course content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-mono font-bold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors text-balance">
                        {course.name}
                      </h3>
                      <p className="text-slate-400 text-sm font-mono line-clamp-2 text-pretty">{course.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-400 font-mono">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {course.sensei_name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.hours}h
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-slate-400">Progreso</span>
                        <span className="font-bold text-cyan-400">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm font-mono">
                      <span className="text-slate-400">{course.lessons_count} lecciones</span>
                      <span className="font-bold text-green-400">${course.price}</span>
                    </div>

                    <Button
                      className={`w-full font-mono ${
                        course.progress === 100
                          ? "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                          : "bg-cyan-500 hover:bg-cyan-600 text-black"
                      }`}
                      variant={course.progress === 100 ? "outline" : "default"}
                    >
                      {course.progress === 100 ? "Completado" : "Continuar"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    byte<span className="text-cyan-400">TECH</span>
                  </span>
                  <div className="text-xs text-slate-500 font-mono">v1.0.0</div>
                </div>
              </div>
              <p className="text-slate-400 font-mono text-xs sm:text-sm leading-relaxed">
                // Plataforma de aprendizaje tecnológico
                <br />
                // Construyendo el futuro, una línea de código a la vez
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 sm:pt-6 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-xs sm:text-sm font-mono text-center sm:text-left">
              © 2025 byteTECH --version 1.0.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

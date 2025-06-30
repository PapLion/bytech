"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UniqueHeader } from "@/bytech/components/unique-header"
import { UniqueFooter } from "@/bytech/components/unique-footer"
import { Button } from "@/bytech/components/ui/button"
import { Input } from "@/bytech/components/ui/input"
import { Badge } from "@/bytech/components/ui/badge"
import { Terminal, Mail, Lock, Eye, EyeOff, User, ArrowRight, Info } from "lucide-react"
import { useAuth } from "@/bytech/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [terminalMessages, setTerminalMessages] = useState<string[]>([])

  const TEST_ACCOUNTS = {
    STUDENT: {
      email: "estudiante@test.com",
      password: "student123",
      description: "Estudiante con 3 cursos comprados",
    },
    TEACHER: {
      email: "profesor@test.com",
      password: "teacher123",
      description: "Profesor que enseña Python y Django",
    },
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "", general: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = { email: "", password: "", general: "" }

    if (!formData.email) {
      newErrors.email = "Email requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Password requerido"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres"
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const addTerminalMessage = (message: string, delay: number) => {
    setTimeout(() => {
      setTerminalMessages((prev) => [...prev, message])
    }, delay)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    console.log("🚀 === FORMULARIO ENVIADO ===")
    console.log("📧 Email del formulario:", formData.email)
    console.log("🔑 Password del formulario:", formData.password ? "***" : "vacío")

    setIsLoading(true)
    setTerminalMessages([])

    // Progressive terminal messages
    addTerminalMessage("$ npm run auth:login", 0)
    addTerminalMessage("→ Validando credenciales...", 500)
    addTerminalMessage("→ Estableciendo sesión segura...", 1000)
    addTerminalMessage("→ Conectando...", 1500)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("🔐 Llamando a login() del contexto...")
    const success = await login(formData.email, formData.password)
    console.log("📊 Resultado del login:", success ? "ÉXITO" : "FALLO")

    if (success) {
      addTerminalMessage("✓ Login exitoso", 2000)
      console.log("✅ Login exitoso, redirigiendo...")

      // Wait a bit more to ensure state is updated
      setTimeout(() => {
        console.log("🔄 Redirigiendo a home...")
        router.push("/")
      }, 2500)
    } else {
      console.log("❌ Login falló")
      setErrors((prev) => ({
        ...prev,
        general: "Credenciales incorrectas. Usa las cuentas de prueba.",
      }))
      setIsLoading(false)
      setTerminalMessages([])
    }
  }

  const handleTestLogin = (accountType: keyof typeof TEST_ACCOUNTS) => {
    const account = TEST_ACCOUNTS[accountType]
    console.log("🧪 Usando cuenta de prueba:", accountType)
    setFormData({
      email: account.email,
      password: account.password,
    })
    setErrors({ email: "", password: "", general: "" })
  }

  return (
    <div className="min-h-screen bg-dynamic-gradient">
      <UniqueHeader />

      {/* Hero Section */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-full px-4 py-2 mb-6">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-mono">./auth --login</span>
              </div>

              <h1 className="font-mono font-bold leading-tight text-white text-2xl sm:text-3xl md:text-4xl mb-4">
                {">"} <span className="text-cyan-400">INGRESAR</span>
              </h1>

              <p className="text-slate-400 font-mono text-sm">// Accede a tu cuenta de byteTECH</p>
            </div>

            {/* Test Accounts Info */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-orange-500/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-mono text-sm font-semibold">CUENTAS DE PRUEBA</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono text-xs">
                      ESTUDIANTE
                    </Badge>
                    <Button
                      onClick={() => handleTestLogin("STUDENT")}
                      variant="outline"
                      size="sm"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10 font-mono text-xs h-6"
                    >
                      Usar
                    </Button>
                  </div>
                  <div className="text-xs font-mono text-slate-400 ml-2">
                    📧 {TEST_ACCOUNTS.STUDENT.email}
                    <br />🔑 {TEST_ACCOUNTS.STUDENT.password}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-mono text-xs">
                      PROFESOR
                    </Badge>
                    <Button
                      onClick={() => handleTestLogin("TEACHER")}
                      variant="outline"
                      size="sm"
                      className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 font-mono text-xs h-6"
                    >
                      Usar
                    </Button>
                  </div>
                  <div className="text-xs font-mono text-slate-400 ml-2">
                    📧 {TEST_ACCOUNTS.TEACHER.email}
                    <br />🔑 {TEST_ACCOUNTS.TEACHER.password}
                  </div>
                </div>
              </div>
            </div>

            {/* Login Form Terminal */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">~/auth/login.js</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* General Error */}
                {errors.general && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-xs font-mono">// Error: {errors.general}</p>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-mono text-slate-300 mb-2">
                    <span className="text-cyan-400">const</span> email =<span className="text-yellow-400">"</span>
                    <span className="text-red-400">EMAIL</span>
                    <span className="text-yellow-400">"</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 font-mono ${
                        errors.email ? "border-red-500" : "focus:border-cyan-400"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs font-mono mt-1">// Error: {errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-mono text-slate-300 mb-2">
                    <span className="text-cyan-400">const</span> password =<span className="text-yellow-400">"</span>
                    <span className="text-red-400">PASSWORD</span>
                    <span className="text-yellow-400">"</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 font-mono ${
                        errors.password ? "border-red-500" : "focus:border-cyan-400"
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs font-mono mt-1">// Error: {errors.password}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-lg font-mono disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                        CONECTANDO...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="mr-2 h-4 w-4" />
                        CONTINUAR
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <Link
                      href="/register"
                      className="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors border-b border-slate-700 hover:border-cyan-400 pb-1"
                    >
                      CREAR CUENTA
                    </Link>
                  </div>
                </div>

                {/* Terminal Output - Progressive messages */}
                {terminalMessages.length > 0 && (
                  <div className="mt-6 p-3 bg-slate-800/50 rounded-lg">
                    <div className="text-xs font-mono text-slate-500 space-y-1">
                      {terminalMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`${
                            message.startsWith("$")
                              ? "text-green-400"
                              : message.startsWith("✓")
                                ? "text-green-400"
                                : message.startsWith("→")
                                  ? "text-slate-400"
                                  : "text-cyan-400"
                          }`}
                        >
                          {message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Additional Options */}
            <div className="mt-6 text-center">
              <Link
                href="/forgot-password"
                className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
              >
                // ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>
      </section>

      <UniqueFooter />
    </div>
  )
}

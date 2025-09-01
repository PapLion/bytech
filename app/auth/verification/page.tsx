"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, CheckCircle } from "lucide-react"

const API_BASE = "http://127.0.0.1:8000/api"

export default function VerificationPage() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Auto-fill email from URL params if available
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("code", code)

      const response = await fetch(`${API_BASE}/auth/verify_register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        setSuccess("Usuario verificado correctamente.")
        // Redirect to login after successful verification
        setTimeout(() => {
          router.push("/auth/login")
        }, 2000)
      } else {
        const errorText = await response.text()
        setError(errorText || "Error en la verificación")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email) {
      setError("Por favor ingresa tu email primero")
      return
    }

    setError(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("email", email)

      const response = await fetch(`${API_BASE}/auth/resend_verification`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        setSuccess("Código de verificación reenviado a tu email.")
      } else {
        const errorText = await response.text()
        setError(errorText || "Error al reenviar código")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verificar Email</CardTitle>
          <CardDescription>Ingresa el código de verificación que enviamos a tu correo electrónico</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="bg-muted"
                readOnly={!!searchParams.get("email")}
              />
              {searchParams.get("email") && (
                <p className="text-xs text-muted-foreground">Email completado automáticamente</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Código de Verificación</Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                required
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-muted-foreground">Revisa tu bandeja de entrada y spam</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verificando..." : "Verificar Cuenta"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Button variant="ghost" onClick={handleResendCode} disabled={loading || !email}>
              ¿No recibiste el código? Reenviar
            </Button>
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta verificada?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

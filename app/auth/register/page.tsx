"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"

const API_BASE = "http://127.0.0.1:8000/api"

const EMAIL_DOMAINS = [
  { value: "@gmail.com", label: "@gmail.com" },
  { value: "@hotmail.com", label: "@hotmail.com" },
  { value: "@outlook.com", label: "@outlook.com" },
  { value: "@yahoo.com", label: "@yahoo.com" },
  { value: "@icloud.com", label: "@icloud.com" },
  { value: "", label: "Personalizado" },
]

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [emailUser, setEmailUser] = useState("")
  const [emailDomain, setEmailDomain] = useState("@gmail.com")
  const [password, setPassword] = useState("")
  const [isSensei, setIsSensei] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const buildFullEmail = (username: string, domain: string) => {
    return domain === "" ? username : username + domain
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const fullEmail = buildFullEmail(emailUser, emailDomain)
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", fullEmail)
      formData.append("password", password)
      formData.append("is_sensei", isSensei.toString())

      const response = await fetch(`${API_BASE}/auth/init_register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        setSuccess("Usuario registrado. Revisa tu email para el código de verificación.")
        // Redirect to verification page with email
        setTimeout(() => {
          router.push(`/auth/verification?email=${encodeURIComponent(fullEmail)}`)
        }, 2000)
      } else {
        const errorText = await response.text()
        setError(errorText || "Error en el registro")
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
          <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
          <CardDescription>Únete a ByteTechEdu y comienza a aprender</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type={emailDomain === "" ? "email" : "text"}
                  placeholder={emailDomain === "" ? "usuario@ejemplo.com" : "usuario"}
                  value={emailUser}
                  onChange={(e) => setEmailUser(e.target.value)}
                  required
                  className="flex-1"
                />
                <Select value={emailDomain} onValueChange={setEmailDomain}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EMAIL_DOMAINS.map((domain) => (
                      <SelectItem key={domain.value} value={domain.value}>
                        {domain.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="sensei" checked={isSensei} onCheckedChange={(checked) => setIsSensei(checked as boolean)} />
              <Label htmlFor="sensei" className="text-sm">
                Quiero ser instructor (Sensei)
              </Label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registrando..." : "Crear Cuenta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
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

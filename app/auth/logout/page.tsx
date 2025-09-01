"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"

const API_BASE = "http://127.0.0.1:8000/api"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      try {
        await fetch(`${API_BASE}/auth/logout`, {
          method: "POST",
          credentials: "include",
        })
      } catch (err) {
        console.error("Logout error:", err)
      } finally {
        // Always redirect to login regardless of API response
        setTimeout(() => {
          router.push("/auth/login")
        }, 1500)
      }
    }

    performLogout()
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <LogOut className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Cerrando Sesión</CardTitle>
          <CardDescription>Te estamos desconectando de forma segura...</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Redirigiendo al login...</p>
        </CardContent>
      </Card>
    </div>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "byteTECH - Plataforma de Cursos Online",
  description: "Aprende tecnología con nuestros cursos especializados",
  generator: "A1_DevHub",
  keywords: [
    "cursos online",
    "tecnología",
    "byteTECH",
    "programación",
    "educación",
    "desarrollo web",
    "python",
    "react",
    "full stack",
  ],
  robots: "index, follow",
  openGraph: {
    title: "byteTECH - Plataforma de Cursos Online",
    description: "Aprende tecnología con nuestros cursos especializados",
    url: "https://bytetechedu.com",
    siteName: "byteTECH",
    images: [
      {
        url: "/byteTECH_1.jpg",
        width: 1200,
        height: 630,
        alt: "byteTECH - Plataforma de Cursos Online",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "byteTECH - Plataforma de Cursos Online",
    description: "Aprende tecnología con nuestros cursos especializados",
    site: "@bytetechedu",
    images: ["/byteTECH_1.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

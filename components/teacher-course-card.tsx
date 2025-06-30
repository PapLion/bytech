"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/bytech/components/ui/card"
import { Badge } from "@/bytech/components/ui/badge"
import { Button } from "@/bytech/components/ui/button"
import { Users, Star, DollarSign, Eye, Edit, BarChart3 } from "lucide-react"
import Link from "next/link"

interface TeacherCourseCardProps {
  title: string
  description: string
  price: number
  duration: string
  students: number
  rating: number
  tags: string[]
  instructor: string
  language: string
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Avanzado" | "Intermedio"
  slug: string
}

export function TeacherCourseCard({
  title,
  description,
  price,
  duration,
  students,
  rating,
  tags,
  language,
  difficulty,
  slug,
}: TeacherCourseCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "beginner":
      case "principiante":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "intermediate":
      case "intermedio":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "advanced":
      case "avanzado":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "python":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "java":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "dart":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    }
  }

  // Calculate estimated revenue
  const estimatedRevenue = price * students

  return (
    <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800 hover:border-purple-500/50 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-mono font-bold text-white text-lg mb-2 group-hover:text-purple-400 transition-colors">
              {title}
            </h3>
            <p className="text-slate-400 text-sm font-mono line-clamp-2">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={getDifficultyColor(difficulty)} variant="outline">
            {difficulty}
          </Badge>
          <Badge className={getLanguageColor(language)} variant="outline">
            {language}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-mono text-sm">Estudiantes</span>
            </div>
            <div className="text-white font-mono font-bold">{students.toLocaleString()}</div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-mono text-sm">Rating</span>
            </div>
            <div className="text-white font-mono font-bold">{rating.toFixed(1)}</div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-mono text-sm">Ingresos Generados</span>
          </div>
          <div className="text-white font-mono font-bold text-lg">${estimatedRevenue.toLocaleString()}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs font-mono"
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge className="bg-slate-700/50 text-slate-400 border-slate-600 text-xs font-mono" variant="outline">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex gap-2 w-full">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono"
            variant="outline"
          >
            <Link href={`/courses/${slug}`}>
              <Eye className="w-4 h-4 mr-1" />
              Ver
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 font-mono"
            variant="outline"
          >
            <Link href={`/editor/${slug}`}>
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Link>
          </Button>
          
        </div>
      </CardFooter>
    </Card>
  )
}

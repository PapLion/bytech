"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LessonManager } from "@/components/lesson-manager"
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  User,
  BookOpen,
  DollarSign,
  Timer,
  MessageSquare,
  Pause,
  RotateCcw,
} from "lucide-react"

interface Lesson {
  id: number
  section_id: number
  title: string
  file_id: string
  mime_type: string
  time_validator: number
  is_completed: boolean
  threads: Array<{
    id: number
    lesson_id: number
    username: string | null
    topic: string
  }> | null
}

interface Section {
  id: number
  title: string
  lessons: Lesson[]
}

interface CourseProgress {
  total_lessons: number
  completed_lessons: number
  progress_percentage: number
}

interface CourseContent {
  id: number
  sensei_id: number
  name: string
  description: string
  hours: number
  miniature_id: string
  video_id: string | null
  price: number
  sensei_name: string
  progress: CourseProgress
  content: Record<string, Section>
}

interface CourseResponse {
  is_paid: boolean
  course_content: CourseContent
}

const API_BASE = "http://127.0.0.1:8000/api"

export default function CoursePage() {
  const [courseData, setCourseData] = useState<CourseResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string

  useEffect(() => {
    if (courseId) {
      loadCourseContent()
    }
  }, [courseId])

  const loadCourseContent = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_BASE}/courses/course_content?course_id=${courseId}`, {
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setCourseData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const handleProgressUpdate = () => {
    // Recargar el contenido del curso cuando se actualiza el progreso
    loadCourseContent()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Cargando curso...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
        <div className="max-w-6xl mx-auto">
          <Alert className="border-red-500 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              {error || 'No se pudo cargar el curso'}
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 text-center">
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const course = courseData.course_content
  const progress = course.progress

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header del curso */}
        <div className="mb-8">
          <Button 
            onClick={() => router.back()} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <Card className="border-2 border-blue-200 bg-white">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    {course.name}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 mb-4">
                    {course.description}
                  </CardDescription>
                </div>
                
                <div className="text-right">
                  <Badge variant="outline" className="mb-2">
                    {courseData.is_paid ? "Curso Comprado" : "Curso Gratuito"}
                  </Badge>
                  <div className="text-2xl font-bold text-blue-600">
                    ${course.price}
                  </div>
                </div>
              </div>
              
              {/* Información del sensei */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Sensei: {course.sensei_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.hours} horas</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{progress.total_lessons} lecciones</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Barra de progreso */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Progreso del curso</span>
                  <span className="text-gray-600">
                    {progress.completed_lessons}/{progress.total_lessons} lecciones
                  </span>
                </div>
                <Progress value={progress.progress_percentage} className="h-3" />
                <p className="text-center text-sm text-gray-600">
                  {progress.progress_percentage}% completado
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido del curso por secciones */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Contenido del Curso
          </h2>
          
          {Object.entries(course.content).map(([sectionNumber, section]) => (
            <Card key={section.id} className="border-2 border-blue-100 bg-white">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl text-blue-900">
                  Sección {sectionNumber}: {section.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {section.lessons.map((lesson) => (
                    <LessonManager
                      key={lesson.id}
                      lesson={lesson}
                      onProgressUpdate={handleProgressUpdate}
                      showTimeValidator={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

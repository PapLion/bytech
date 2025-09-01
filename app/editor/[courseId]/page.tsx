"use client"

import type React from "react"

import { UniqueHeader } from "@//components/unique-header"
import { UniqueFooter } from "@//components/unique-footer"
import { Button } from "@//components/ui/button"
import { Input } from "@//components/ui/input"
import { Textarea } from "@//components/ui/textarea"
import { Badge } from "@//components/ui/badge"
import {
  Terminal,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Play,
  FileText,
  ArrowLeft,
  Users,
  DollarSign,
  Clock,
} from "lucide-react"
import { useAuth } from "@//lib/auth-context"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useEditor } from "@/hooks/use-editor"
import { EditorCourseForm } from "@/components/editor-course-form"
import { EditorLessonModal } from "@/components/editor-lesson-modal"
import { EditorGiftModal } from "@/components/editor-gift-modal"
import { EditorFileModal } from "@/components/editor-file-modal"

interface Section {
  id: number
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: number | string // Modificado para aceptar string (UUID) o number
  title: string
  type: "video" | "document"
  file_id?: string
  duration?: string
}

interface CourseData {
  id: number
  name: string
  description: string
  price: number
  hours: number
  students?: number
  rating?: number
  content?: Section[]
}

import { useParams } from "next/navigation"

export default function EditorPage() {
  const params = useParams<{ courseId: string }>()
  const courseId = params.courseId as string
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  
  // Usar el hook personalizado del editor
  const {
    course,
    isLoading,
    isEditing,
    isSaving,
    isAddingSection,
    isAddingLesson,
    error,
    success,
    selectedSection,
    fileModal,
    showGiftModal,
    editForm,
    giftForm,
    lessonForm,
    setEditForm,
    setGiftForm,
    setLessonForm,
    loadCourse,
    saveMetadata,
    addSection,
    removeSection,
    addLesson,
    removeLesson,
    giftCourse,
    viewFile,
    setEditing,
    setSelectedSection,
    closeFileModal,
    openGiftModal,
    closeGiftModal,
    clearError,
    clearSuccess,
    getCourseStats
  } = useEditor(courseId)

  // Verificar permisos del usuario
      if (!isLoggedIn) {
        router.push("/ingesar")
    return null
  }

  if (user?.role !== "teacher") {
    router.push("/inicio")
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono">Cargando editor...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn || !user || user.role !== "teacher") {
    return null
  }

  if (error && !course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-red-800 rounded-xl p-8 text-center">
          <p className="text-red-400 font-mono">{error}</p>
          <Link href="/inicio">
            <Button className="ml-2 border border-cyan-500 text-cyan-400 bg-slate-900 hover:bg-cyan-900 hover:text-white">
              Volver al Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-8 text-center">
          <p className="text-slate-400 font-mono">Curso no encontrado</p>
          <Link href="/home">
            <Button className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-600 transition-colors">
              Volver al Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dynamic-gradient">
      <UniqueHeader />

      {/* Header Section */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/home">
                <Button className="ml-2 border border-cyan-500 text-cyan-400 bg-slate-900 hover:bg-cyan-900 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>

              <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-full px-4 py-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-mono">./editor --course {courseId}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSaveMetadata}
                    disabled={isSaving}
                    className="bg-green-500 hover:bg-green-600 text-black font-mono"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-mono"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 text-center">
              <p className="text-red-400 font-mono text-sm">{error}</p>
            </div>
          )}

          {/* Course Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Details */}
            <EditorCourseForm
              course={course}
              editForm={editForm}
              isEditing={isEditing}
              isSaving={isSaving}
              error={error}
              success={success}
              onEditFormChange={setEditForm}
              onSave={saveMetadata}
              onCancel={() => setEditing(false)}
              onStartEditing={() => setEditing(true)}
            />

              {/* Course Stats */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h3 className="font-mono text-cyan-400 font-semibold mb-4">ESTADÍSTICAS DEL CURSO</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-mono text-sm">Secciones:</span>
                  <span className="text-white font-mono">{getCourseStats()?.sections || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-mono text-sm">Lecciones:</span>
                  <span className="text-white font-mono">{getCourseStats()?.lessons || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-mono text-sm">Videos:</span>
                  <span className="text-white font-mono">{getCourseStats()?.videos || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-mono text-sm">Documentos:</span>
                  <span className="text-white font-mono">{getCourseStats()?.documents || 0}</span>
                </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Button
                  onClick={openGiftModal}
                    className="bg-purple-500 hover:bg-purple-600 text-black font-mono w-full"
                  >
                    🎁 Regalar curso
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transición suave */}
      <div className="section-transition-up"></div>

      {/* Content Editor */}
      <section className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/3 via-transparent to-blue-900/3" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          {/* Sections */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="font-mono text-2xl sm:text-3xl font-bold text-green-400">SECCIONES:</h2>
                  <p className="text-slate-400 font-mono text-sm">// Organiza el contenido de tu curso</p>
                </div>
              </div>

              <Button
                onClick={addSection}
                disabled={isAddingSection}
                className="bg-green-500 hover:bg-green-600 text-black font-mono"
              >
                {isAddingSection ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                    Creando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Sección
                  </>
                )}
              </Button>
            </div>

            {course.content && course.content.length > 0 ? (
              <div className="space-y-6">
                {course.content.map((section) => (
                  <div
                    key={section.id} // Simplificado a solo section.id
                    className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </div>
                        <span className="text-xs font-mono text-slate-400">~/section/{section.id}.js</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-slate-700 text-slate-300 font-mono">
                          {section.lessons.length} lecciones
                        </Badge>
                        <Button
                          onClick={() => removeSection(section.id)}
                          size="sm"
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-mono text-lg font-bold text-white mb-4">{section.title}</h3>

                      {/* Lessons */}
                      <div className="space-y-3">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id} // Simplificado a solo lesson.id
                            className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.type === "video" ? (
                                <Play className="w-4 h-4 text-red-400" />
                              ) : (
                                <FileText className="w-4 h-4 text-blue-400" />
                              )}
                              <span className="text-white font-mono text-sm">{lesson.title}</span>
                              <Badge className="bg-slate-700 text-slate-300 font-mono text-xs">{lesson.type}</Badge>
                              {lesson.file_id && (
                                <Button
                                  onClick={() => viewFile(lesson.file_id!, lesson.type)}
                                  size="sm"
                                  className="ml-2 border border-cyan-500 text-cyan-400 bg-slate-900 hover:bg-cyan-900 hover:text-white"
                                >
                                  Ver archivo
                                </Button>
                              )}
                            </div>
                            <Button
                              onClick={() =>
                                lesson.file_id && removeLesson(lesson.file_id, lesson.id, section.id)
                              }
                              size="sm"
                              variant="destructive"
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {/* Add Lesson Button */}
                      <Button
                        onClick={() => setSelectedSection(section.id)}
                        className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-black font-mono"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Lección
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-8 text-center">
                <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 font-mono">No hay secciones en este curso</p>
                <p className="text-slate-500 font-mono text-sm mt-2">// Crea tu primera sección para comenzar</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      <EditorLessonModal
          isOpen={!!selectedSection}
        isLoading={isAddingLesson}
        error={error}
          onClose={() => setSelectedSection(null)}
        onSubmit={(lessonData) => selectedSection && addLesson(selectedSection, lessonData)}
      />

      <EditorFileModal
        isOpen={!!fileModal}
        fileUrl={fileModal?.url || ''}
        fileType={fileModal?.type || 'document'}
        onClose={closeFileModal}
      />

      <EditorGiftModal
        isOpen={showGiftModal}
        isLoading={isSaving}
        error={error}
        success={success}
        courseName={course?.name || ''}
        onClose={closeGiftModal}
        onSubmit={giftCourse}
        onFormChange={setGiftForm}
        formData={giftForm}
      />

      <UniqueFooter />
    </div>
  )
}



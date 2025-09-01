// ============================================================================
// 🌐 API CLIENT - ByteTechEdu
// ============================================================================
// Funciones para la comunicación cliente-servidor con el backend FastAPI
// Basado en el sistema de autenticación existente

// Configuración de la API
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Tipos TypeScript para las respuestas de la API
export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data: T;
  message?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_sensei: boolean;
  is_verify?: boolean;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface VerificationResponse {
  message: string;
  user: {
    user_id: number;
    user_name: string;
    email: string;
    is_sensei: boolean;
    is_verify: boolean;
  };
}

export interface RestorePasswordResponse {
  message: string;
  token?: string;
}

export interface SupportForm {
  name: string;
  mail: string;
  issue: string;
  message: string;
}

export interface SupportResponse {
  message: string;
  status: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  is_sensei: boolean;
  is_verify: boolean;
  created_at?: string;
  last_login?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: UserProfile;
}

export interface UserStats {
  total_courses: number;
  completed_courses: number;
  total_lessons: number;
  completed_lessons: number;
  total_hours: number;
  achievements: string[];
  rank: string;
}

// ============================================================================
// 📚 EDITOR SYSTEM INTERFACES
// ============================================================================

export interface Lesson {
  id: number | string;
  section_id: number;
  title: string;
  file_id?: string;
  mime_type?: string;
  time_validator?: number;
  is_completed?: boolean;
  threads?: Thread[];
}

export interface Thread {
  id: number;
  lesson_id: number;
  username?: string;
  topic: string;
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface CourseContent {
  id: number;
  sensei_id: number;
  name: string;
  description: string;
  hours: number;
  miniature_id: string;
  video_id?: string;
  price: number;
  sensei_name: string;
  progress: {
    total_lessons: number;
    completed_lessons: number;
    progress_percentage: number;
  };
  content: {
    [key: string]: {
      id: number;
      title: string;
      lessons: Lesson[];
    };
  };
}

export interface CourseContentResponse {
  is_paid: boolean | null;
  course_content: CourseContent;
}

export interface CreateSectionResponse {
  course_id: number;
  section_id: number;
}

export interface CreateLessonResponse {
  lesson_id: number | string;
  file_id: string;
}

export interface EditMetadataRequest {
  course_id: number;
  name?: string;
  description?: string;
  price?: string;
  hours?: string;
}

export interface EditMetadataResponse {
  detail: string;
  course: {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
  };
}

export interface GiveCourseRequest {
  course_id: number;
  user_email_to_give: string;
}

export interface GiveCourseResponse {
  message: string;
}

// ============================================================================
// 📚 COURSES SYSTEM INTERFACES
// ============================================================================

export interface Course {
  id: number;
  sensei_id: number;
  name: string;
  description: string;
  price: number;
  hours: number;
  miniature_id: string;
  sensei_name: string;
}

export interface CoursesResponse {
  mtd_courses: Course[];
}

export interface PurchaseRequest {
  course_id: number;
  user_email: string;
}

export interface PurchaseResponse {
  message: string;
  purchase_id?: number;
}

// ============================================================================
// 💬 FORUMS SYSTEM INTERFACES
// ============================================================================

export interface CreateThreadRequest {
  lesson_id: number;
  topic: string;
}

export interface ThreadResponse {
  id: number;
  title: string;
}

export interface CreateThreadResponse {
  message: string;
  thread: ThreadResponse;
}

export interface Message {
  id: number;
  thread_id: number;
  user_id: number;
  username: string;
  content: string;
  created_at: string;
}

export interface MessagesResponse {
  messages: Message[];
}

export interface CreateMessageRequest {
  thread_id: number;
  content: string;
}

export interface CreateMessageResponse {
  message: string;
  message_id: number;
}

// ============================================================================
// 📊 STATS SYSTEM INTERFACES
// ============================================================================

export interface CourseStats {
  total_lessons: number;
}

export interface UserStatsResponse {
  total_courses: number;
  completed_courses: number;
  total_lessons: number;
  completed_lessons: number;
  total_hours: number;
  achievements: string[];
  rank: string;
}

// ============================================================================
// 🎨 WORKBENCH SYSTEM INTERFACES
// ============================================================================

export interface CreateCourseRequest {
  name: string;
  description: string;
  price: string;
  hours: string;
  file: File;
}

export interface CreateCourseResponse {
  message: string;
  mtd_course: {
    course_id: number;
    sensei_id: number;
    name: string;
    description: string;
    price: string;
    hours: string;
    miniature_id: string;
  };
}

export interface DeleteCourseResponse {
  message: string;
}

// ============================================================================
// 🛠️ FUNCIONES UTILITARIAS
// ============================================================================

/**
 * Construye un email completo a partir de un nombre de usuario y un dominio
 */
export const buildFullEmail = (username: string, domain: string): string => {
  return domain === '' ? username : username + domain;
};

/**
 * Realiza una petición HTTP POST a un endpoint del backend
 */
const makeApiRequest = async <T>(
  url: string, 
  formData: FormData
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include", // Importante para enviar cookies de sesión
      body: formData
    });
    
    const responseText = await response.text();
    let parsedData: T;
    
    try {
      parsedData = JSON.parse(responseText);
    } catch (e) {
      parsedData = responseText as any;
    }
    
    return {
      ok: response.ok,
      status: response.status,
      data: parsedData
    };
    
  } catch (error) {
    console.error("API request failed:", error);
    return {
      ok: false,
      status: 0,
      data: error instanceof Error ? error.message : "Network error"
    };
  }
};

/**
 * Realiza una petición HTTP GET a un endpoint del backend
 */
const makeGetRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    
    const responseText = await response.text();
    let parsedData: T;
    
    try {
      parsedData = JSON.parse(responseText);
    } catch (e) {
      parsedData = responseText as any;
    }
    
    return {
      ok: response.ok,
      status: response.status,
      data: parsedData
    };
    
  } catch (error) {
    console.error("API GET request failed:", error);
    return {
      ok: false,
      status: 0,
      data: error instanceof Error ? error.message : "Network error"
    };
  }
};

// ============================================================================
// 🔐 FUNCIONES DE AUTENTICACIÓN
// ============================================================================

/**
 * Inicia el proceso de registro de un usuario
 */
export const initRegister = async (
  name: string,
  email: string,
  password: string,
  isSensei: boolean = false
): Promise<ApiResponse<AuthResponse>> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("is_sensei", isSensei.toString());

  return makeApiRequest<AuthResponse>(`${API_BASE}/auth/init_register`, formData);
};

/**
 * Verifica el registro de un usuario con el código recibido
 */
export const verifyRegister = async (
  email: string,
  code: string
): Promise<ApiResponse<VerificationResponse>> => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("code", code);

  return makeApiRequest<VerificationResponse>(`${API_BASE}/auth/verify_register`, formData);
};

/**
 * Autentica un usuario (login)
 */
export const login = async (
  email: string,
  password: string
): Promise<ApiResponse<AuthResponse>> => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  return makeApiRequest<AuthResponse>(`${API_BASE}/auth/login`, formData);
};

/**
 * Cierra la sesión del usuario (logout)
 */
export const logout = async (): Promise<ApiResponse<{ message: string }>> => {
  const formData = new FormData();
  return makeApiRequest<{ message: string }>(`${API_BASE}/auth/logout`, formData);
};

/**
 * Inicia el proceso de restauración de contraseña
 */
export const initRestorePassword = async (
  email: string
): Promise<ApiResponse<RestorePasswordResponse>> => {
  const formData = new FormData();
  formData.append("email", email);

  return makeApiRequest<RestorePasswordResponse>(`${API_BASE}/auth/init_restore_password`, formData);
};

/**
 * Completa la restauración de contraseña con el token y nueva contraseña
 */
export const restorePassword = async (
  token: string,
  newPassword: string
): Promise<ApiResponse<{ message: string }>> => {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("new_password", newPassword);

  return makeApiRequest<{ message: string }>(`${API_BASE}/auth/restore_password`, formData);
};

/**
 * Obtiene todos los usuarios registrados (solo para administradores)
 */
export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  return makeGetRequest<User[]>(`${API_BASE}/auth/get_users`);
};

// ============================================================================
// 🔄 FUNCIONES DE REFRESH TOKEN
// ============================================================================

/**
 * Refresca el token de acceso usando el refresh token
 */
export const refreshAccessToken = async (): Promise<ApiResponse<{ access_token: string }>> => {
  const formData = new FormData();
  return makeApiRequest<{ access_token: string }>(`${API_BASE}/auth/refresh`, formData);
};

// ============================================================================
// 🎯 FUNCIONES DE VALIDACIÓN
// ============================================================================

/**
 * Verifica si el usuario está autenticado
 */
export const checkAuth = async (): Promise<ApiResponse<User>> => {
  return makeGetRequest<User>(`${API_BASE}/auth/me`);
};

/**
 * Valida si un email tiene un formato válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si una contraseña cumple con los requisitos mínimos
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

// ============================================================================
// 🚀 FUNCIONES DE INICIALIZACIÓN
// ============================================================================

/**
 * Configura la URL base de la API
 */
export const setApiBase = (baseUrl: string): void => {
  (globalThis as any).API_BASE = baseUrl;
};

/**
 * Obtiene la URL base de la API
 */
export const getApiBase = (): string => {
  return (globalThis as any).API_BASE || API_BASE;
};

// ============================================================================
// 📝 FUNCIONES DE MANEJO DE ERRORES
// ============================================================================

/**
 * Maneja errores de la API de forma consistente
 */
export const handleApiError = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.data?.message) {
    return error.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'Ha ocurrido un error inesperado';
};

/**
 * Determina si un error es de red
 */
export const isNetworkError = (error: any): boolean => {
  return error?.status === 0 || error?.ok === false;
};

/**
 * Determina si un error es de autenticación
 */
export const isAuthError = (error: any): boolean => {
  return error?.status === 401 || error?.status === 403;
};

// ============================================================================
// 🧪 FUNCIONES DE TESTING (solo en desarrollo)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  // Función para probar la conectividad con el backend
  export const testConnection = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/health`, { method: 'GET' });
      return response.ok;
    } catch {
      return false;
    }
  };
  
  // Función para limpiar cookies de sesión (útil para testing)
  export const clearSessionCookies = (): void => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
}

// ============================================================================
// 🆘 FUNCIONES DE SOPORTE
// ============================================================================

/**
 * Envía un formulario de soporte al backend
 */
export const sendSupportEmail = async (
  formData: SupportForm
): Promise<ApiResponse<SupportResponse>> => {
  const form = new FormData();
  form.append("name", formData.name);
  form.append("mail", formData.mail);
  form.append("issue", formData.issue);
  form.append("message", formData.message);

  return makeApiRequest<SupportResponse>(`${API_BASE}/support/send_email`, form);
};

// ============================================================================
// 👤 FUNCIONES DE PERFIL DE USUARIO
// ============================================================================

/**
 * Obtiene el perfil completo del usuario autenticado
 */
export const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
  return makeGetRequest<UserProfile>(`${API_BASE}/user/profile`);
};

/**
 * Actualiza las credenciales del usuario (nombre y email)
 */
export const updateUserCredentials = async (
  name: string,
  email: string
): Promise<ApiResponse<UpdateProfileResponse>> => {
  const formData = new FormData();
  formData.append("username", name);
  formData.append("email", email);

  return makeApiRequest<UpdateProfileResponse>(`${API_BASE}/user/modify_credentials`, formData);
};

/**
 * Actualiza la contraseña del usuario
 */
export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse<{ message: string }>> => {
  const formData = new FormData();
  formData.append("current_password", currentPassword);
  formData.append("new_password", newPassword);

  return makeApiRequest<{ message: string }>(`${API_BASE}/user/update_password`, formData);
};

/**
 * Obtiene las estadísticas del usuario
 */
export const getUserStats = async (): Promise<ApiResponse<UserStats>> => {
  return makeGetRequest<UserStats>(`${API_BASE}/user/stats`);
};

/**
 * Sube una imagen de perfil
 */
export const uploadProfileImage = async (
  imageFile: File
): Promise<ApiResponse<{ image_url: string }>> => {
  const formData = new FormData();
  formData.append("profile_image", imageFile);

  return makeApiRequest<{ image_url: string }>(`${API_BASE}/user/upload_image`, formData);
};

/**
 * Elimina la cuenta del usuario
 */
export const deleteUserAccount = async (
  password: string
): Promise<ApiResponse<{ message: string }>> => {
  const formData = new FormData();
  formData.append("password", password);

  return makeApiRequest<{ message: string }>(`${API_BASE}/user/delete_account`, formData);
};

// ============================================================================
// 📚 EDITOR SYSTEM FUNCTIONS
// ============================================================================

/**
 * Obtiene el contenido completo de un curso
 */
export const getCourseContent = async (
  courseId: number
): Promise<ApiResponse<CourseContentResponse>> => {
  return makeGetRequest<CourseContentResponse>(`${API_BASE}/courses/course_content?course_id=${courseId}`);
};

/**
 * Crea una nueva sección en un curso
 */
export const createSection = async (
  courseId: number,
  sectionName: string
): Promise<ApiResponse<CreateSectionResponse>> => {
  const formData = new FormData();
  formData.append("section_name", sectionName);
  
  return makeApiRequest<CreateSectionResponse>(`${API_BASE}/workbrench/new_section/${courseId}`, formData);
};

/**
 * Elimina una sección de un curso
 */
export const deleteSection = async (
  sectionId: number
): Promise<ApiResponse<{ message: string }>> => {
  return makeApiRequest<{ message: string }>(`${API_BASE}/workbrench/delete_section/${sectionId}`, null, 'DELETE');
};

/**
 * Crea una nueva lección en una sección
 */
export const createLesson = async (
  formData: FormData
): Promise<ApiResponse<CreateLessonResponse>> => {
  return makeApiRequest<CreateLessonResponse>(`${API_BASE}/workbrench/add_lesson`, formData);
};

/**
 * Elimina una lección
 */
export const deleteLesson = async (
  fileId: string,
  lessonId: number
): Promise<ApiResponse<{ message: string }>> => {
  return makeApiRequest<{ message: string }>(`${API_BASE}/workbrench/delete_lesson/${fileId}/${lessonId}`, null, 'POST');
};

/**
 * Edita los metadatos de un curso
 */
export const editMetadata = async (
  metadata: EditMetadataRequest
): Promise<ApiResponse<EditMetadataResponse>> => {
  const formData = new FormData();
  formData.append("course_id", metadata.course_id.toString());
  if (metadata.name) formData.append("name", metadata.name);
  if (metadata.description) formData.append("description", metadata.description);
  if (metadata.price) formData.append("price", metadata.price);
  if (metadata.hours) formData.append("hours", metadata.hours);

  return makeApiRequest<EditMetadataResponse>(`${API_BASE}/workbrench/edit_metadata`, formData);
};

/**
 * Regala un curso a un usuario
 */
export const giveCourse = async (
  courseId: number,
  userEmail: string
): Promise<ApiResponse<GiveCourseResponse>> => {
  const formData = new FormData();
  formData.append("course_id", courseId.toString());
  formData.append("user_email_to_give", userEmail);

  return makeApiRequest<GiveCourseResponse>(`${API_BASE}/workbrench/give_course`, formData);
};

/**
 * Obtiene un archivo por su ID
 */
export const getFileById = async (
  fileId: string
): Promise<ApiResponse<Blob>> => {
  return makeGetRequest<Blob>(`${API_BASE}/media/get_file?file_id=${fileId}`);
};

/**
 * Marca una lección como completada
 */
export const markLessonComplete = async (
  lessonId: number
): Promise<ApiResponse<{ message: string }>> => {
  const formData = new FormData();
  formData.append("lesson_id", lessonId.toString());
  
  return makeApiRequest<{ message: string }>(`${API_BASE}/courses/mark_progress`, formData);
};

/**
 * Desmarca una lección como completada
 */
export const unmarkLessonComplete = async (
  lessonId: number
): Promise<ApiResponse<{ message: string }>> => {
  const formData = new FormData();
  formData.append("lesson_id", lessonId.toString());
  
  return makeApiRequest<{ message: string }>(`${API_BASE}/courses/unmark_progress`, formData);
};

export default {
  // Auth functions
  initRegister,
  verifyRegister,
  login,
  logout,
  initRestorePassword,
  restorePassword,
  getUsers,
  refreshAccessToken,
  checkAuth,
  
  // Support functions
  sendSupportEmail,
  
  // Profile functions
  getUserProfile,
  updateUserCredentials,
  updateUserPassword,
  getUserStats,
  uploadProfileImage,
  deleteUserAccount,
  
  // Editor functions
  getCourseContent,
  createSection,
  deleteSection,
  createLesson,
  deleteLesson,
  editMetadata,
  giveCourse,
  getFileById,
  
  // Utility functions
  buildFullEmail,
  isValidEmail,
  isValidPassword,
  setApiBase,
  getApiBase,
  
  // Error handling
  handleApiError,
  isNetworkError,
  isAuthError,
  
  // Constants
  API_BASE
};

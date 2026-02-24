// Core Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  crm?: string
  phone?: string
  state?: string
  role: 'STUDENT' | 'ADMIN'
  hasAccess: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  price: number
  durationWeeks: number
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  imageUrl: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  modules?: Module[]
}

export interface Module {
  id: string
  courseId: string
  name: string
  description: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lessons?: Lesson[]
}

export interface Lesson {
  id: string
  moduleId: string
  name: string
  description: string
  order: number
  duration?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  contents?: Content[]
}

export interface Content {
  id: string
  lessonId: string
  type: 'PDF' | 'VIDEO' | 'TEXT' | 'LINK'
  title: string
  description: string
  url: string
  fileSize?: number
  mimeType?: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface StudentCourse {
  id: string
  studentId: string
  courseId: string
  enrolledAt: Date
  isActive: boolean
  progress: number
  completedAt?: Date
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
  timestamp: Date
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string
  lastName: string
  crm?: string
}

export interface Session {
  user: User
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

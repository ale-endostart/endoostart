import axios from 'axios'
import { getSession } from 'next-auth/react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10)

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession()
  if (session && (session as any).accessToken) {
    config.headers.Authorization = `Bearer ${(session as any).accessToken}`
  }
  return config
})

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient

// API Methods
export const api = {
  // Courses
  courses: {
    getAll: () => apiClient.get('/api/courses'),
    getOne: (id: string) => apiClient.get(`/api/courses/${id}`),
    getModules: (courseId: string) =>
      apiClient.get(`/api/courses/${courseId}/modules`),
  },

  // Content
  content: {
    getOne: (id: string) => apiClient.get(`/api/content/${id}`),
    download: (id: string) => apiClient.get(`/api/content/${id}/download`),
    trackView: (id: string) =>
      apiClient.post(`/api/content/${id}/track-view`),
  },

  // Students
  students: {
    getProfile: () => apiClient.get('/api/students/profile'),
    updateProfile: (data: any) =>
      apiClient.put('/api/students/profile', data),
    getCourses: () => apiClient.get('/api/students/courses'),
    getProgress: () => apiClient.get('/api/students/progress'),
  },

  // Analytics
  analytics: {
    trackEvent: (event: string, data?: any) =>
      apiClient.post('/api/analytics/events', { event, data }),
    trackConversion: (data: any) =>
      apiClient.post('/api/analytics/conversion', data),
  },
}

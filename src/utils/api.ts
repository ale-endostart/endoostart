const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/signin';
    }
    throw new Error('Sessão expirada');
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || data.message || 'Erro no servidor');
  }

  return response.json();
}

export const api = {
  get: <T = any>(path: string) =>
    fetch(`${API_URL}${path}`, { headers: getHeaders() }).then(r => handleResponse<T>(r)),

  post: <T = any>(path: string, body?: any) =>
    fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    }).then(r => handleResponse<T>(r)),

  put: <T = any>(path: string, body?: any) =>
    fetch(`${API_URL}${path}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    }).then(r => handleResponse<T>(r)),

  delete: <T = any>(path: string) =>
    fetch(`${API_URL}${path}`, {
      method: 'DELETE',
      headers: getHeaders(),
    }).then(r => handleResponse<T>(r)),

  upload: <T = any>(path: string, formData: FormData) => {
    const headers: HeadersInit = {};
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers,
      body: formData,
    }).then(r => handleResponse<T>(r));
  },
};

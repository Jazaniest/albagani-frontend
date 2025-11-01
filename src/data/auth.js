// ==============================
// API URL & LocalStorage Key
// ==============================
const API_URL = 'https://api.albagani.com/api/auth';
const LS_KEY = 'auth_token';

// ==============================
// Fungsi untuk login
// ==============================
export async function login({ username, password }) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login gagal. Silakan coba lagi.');
    }

    const data = await response.json();
    console.log("Backend response:", data);

    if (data.token) {
      localStorage.setItem(LS_KEY, data.token);
      return data.token;
    }

    throw new Error('Token tidak ditemukan dalam respons.');

  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

// ==============================
// Fungsi untuk logout
// ==============================
export async function logout() {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    localStorage.removeItem(LS_KEY);
  }
}

// ==============================
// Fungsi untuk mendapatkan token dari localStorage
// ==============================
export function getToken() {
  // Ambil token dari localStorage
  const raw = localStorage.getItem(LS_KEY);
  // Kembalikan null bila token kosong atau string tidak valid
  if (!raw || raw === 'undefined' || raw === 'null') {
    return null;
  }
  return raw;
}

// ==============================
// Fungsi untuk mengecek apakah pengguna sudah login
// ==============================
export function isLoggedIn() {
  const token = getToken();
  return !!token;
}

// ==============================
// Fungsi untuk mengirimkan token untuk API request yang memerlukan otentikasi
// ==============================
export async function authenticatedRequest(url, options = {}) {
  const token = getToken();
  if (!token) {
    throw new Error('Pengguna belum login.');
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem(LS_KEY);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Terjadi kesalahan saat mengakses data.');
  }

  return response.json();
}
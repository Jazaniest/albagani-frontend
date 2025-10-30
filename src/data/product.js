// ==============================
// CONFIGURASI API
// ==============================
const API_URL = 'https://api.albagani.com/api/products';

// Helper function untuk request dengan credentials
const fetchWithCredentials = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

// ==============================
// Fungsi untuk mengambil produk dari backend
// ==============================
export async function getProducts() {
  try {
    const response = await fetchWithCredentials(API_URL, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal mengambil data produk');
    }

    const data = await response.json();
    console.log('Data Produk:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// ==============================
// Fungsi untuk menambah produk melalui backend
// ==============================
export async function addProduct({ product_name, product_price, product_photo, product_link }) {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    throw new Error('Token tidak ditemukan. Silakan login kembali.');
  }

  try {
    const response = await fetchWithCredentials(`${API_URL}/add-product`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_name,
        product_price,
        product_photo,
        product_link
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal menambahkan produk');
    }

    const addedProduct = await response.json();
    return addedProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

// ==============================
// Fungsi untuk menghapus produk melalui backend
// ==============================
export async function removeProduct(id) {
  try {
    const response = await fetchWithCredentials(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal menghapus produk');
    }

    return id;
  } catch (error) {
    console.error('Error removing product:', error);
    throw error;
  }
}

// ==============================
// Fungsi untuk mencatat klik produk melalui backend
// ==============================
export async function recordClick(id) {
  try {
    const response = await fetchWithCredentials(`${API_URL}/${id}/click`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal mencatat klik produk');
    }

    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error('Error recording click:', error);
    throw error;
  }
}

// ==============================
// Fungsi untuk fetch data produk dari URL
// ==============================
export const fetchProductDataFromBackend = async (url) => {
  try {
    const response = await fetchWithCredentials(`${API_URL}/find`, {
      method: 'POST',
      body: JSON.stringify({ link: url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal mengambil data produk');
    }

    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error("Data produk tidak ditemukan.");
    }
  } catch (error) {
    console.error("Error fetching product data from backend:", error);
    throw error;
  }
};
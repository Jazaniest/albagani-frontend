// ==============================
// CONFIGURASI API
// ==============================
const API_URL = 'https://api.albagani.com/api/products';

// ==============================
// Helper function untuk request dengan credentials
// ==============================
const fetchWithCredentials = async (url, options = {}) => {
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(url, { ...options, credentials: 'include', headers });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('auth_token');
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    throw new Error('Unauthorized');
  }

  return response;
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
  let response;
  try {
    if (product_photo instanceof File) {
      const formData = new FormData();
      formData.append('product_name', product_name);
      formData.append('product_price', product_price);
      formData.append('product_link', product_link);
      formData.append('product_photo', product_photo); // nama field sesuai BE
      response = await fetchWithCredentials(`${API_URL}/add-product/manual`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
    } else {
      response = await fetchWithCredentials(`${API_URL}/add-product/tiktok`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ product_name, product_price, product_photo, product_link }),
      });
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal menambahkan produk');
    }

    return await response.json();  // Mengembalikan hasil response dari server
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}


// ==============================
// Fungsi untuk menghapus produk melalui backend
// ==============================
export async function removeProduct(id) {
  // Ambil token dari localStorage untuk otentikasi
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('Token tidak ditemukan. Silakan login kembali.');
  }
  try {
    // Kirim permintaan DELETE dengan header Authorization
    const response = await fetchWithCredentials(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Jika respons tidak OK (misal 401/403), ambil pesan error dari backend
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal menghapus produk');
    }

    // Backend biasanya mengembalikan id atau pesan sukses; cukup kembalikan id
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

// ==============================
// Fungsi untuk memperbarui produk melalui backend (edit)
// ==============================
export async function updateProductData(id, { product_name, product_price, product_photo, product_link }) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('Token tidak ditemukan. Silakan login kembali.');
  }
  try {
    const response = await fetchWithCredentials(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ product_name, product_price, product_photo, product_link }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Gagal memperbarui produk');
    }
    const updated = await response.json();
    return updated;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export const category = () => [
  "Fashion",
  "Kecantikan",
  "Perabot",
  "Elektronik",
  "Kebutuhan Harian",
  "Otomotif",
  "Hobi",
  "ATK",
  "Outdoor",
  "Produk Digital"
];

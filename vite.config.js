// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://vt.tokopedia.com',  // Ganti dengan domain API tujuan
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),  // Menghapus `/api` dari path
//       },
//     },
//     // headers: {
//     //   'X-Content-Type-Options': 'nosniff',
//     //   'X-Frame-Options': 'DENY',
//     //   'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
//     // }
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Proxy hanya untuk development, production langsung ke API
  server: {
    proxy: {
      '/api': {
        target: 'https://api.albagani.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
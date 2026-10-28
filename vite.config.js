import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['import-metaprop-plugin', 'import-assertions-plugin'],
      },
    }),
    visualizer({ open: true }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'public/build',
    manifest: true,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
        certificates: 'src/pages/Certificates.jsx',
        cv: 'src/pages/CV.jsx',
        publications: 'src/pages/Publications.jsx',
        default: 'src/pages/index.jsx',
      },
    },
  },
  base: '/',
})

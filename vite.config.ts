/// <reference types="vitest" />
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.tsx'],
    setupFiles: './src/setupTests.ts',
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
  },
})

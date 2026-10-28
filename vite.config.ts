import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// base './' makes every asset path relative, so the build works on GitHub Pages
// whether it is served from https://user.github.io/ or https://user.github.io/repo/.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { target: 'es2020', sourcemap: false },
  test: { environment: 'node' },
})

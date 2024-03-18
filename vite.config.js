import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        manifest: true,
        outDir: './dist/assets',
        lib: {
          entry: {
            flowbite: resolve(__dirname, './node_modules/flowbite/dist/flowbite.js'),
            htmx: resolve(__dirname, './node_modules/htmx.org/dist/htmx.js'),
            alpine: resolve(__dirname, './node_modules/alpinejs/dist/cdn.js'),
          },
          formats: ["es", "cjs"],
        },
      },    
})
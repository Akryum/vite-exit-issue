import { createServer, build } from 'vite'
import vue from '@vitejs/plugin-vue'

const server = await createServer({
  root: process.cwd() + '/src',
  plugins: [
    vue()
  ]
})
await server.pluginContainer.buildStart({})
console.log(await server.transformRequest('./App.vue'))
await server.close()

await build({
  root: process.cwd() + '/src',
  plugins: [
    vue()
  ],
  build: {
    rollupOptions: {
      input: [
        'index.ts'
      ]
    }
  }
})

/*
Callstack:

(@vite/plugin-vue)
- transformMain
(vite)
- transformWithEsbuild
- loadTsconfigJsonForFile
- ensureWatchedFile (<- leak)


The `vite:esbuild` plugin set `server` in `configureServer` which then leads to vite's `build` to create watchers.
*/
import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['index.ts'],
    format: ['esm'],
    dts: {
        resolve: true
    },
    clean: true,
    treeshake: true,
    esbuildOptions(options) {
        options.bundle = true
        options.platform = 'node'
    }
})

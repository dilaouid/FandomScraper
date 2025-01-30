import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    esbuildOptions(options) {
        options.bundle = true
        options.platform = 'node'
    }
})

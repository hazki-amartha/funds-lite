import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: '../src/funds-lite/index.ts' },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
  onSuccess: 'cp ../src/funds-lite/components/styles.css dist/styles.css',
})

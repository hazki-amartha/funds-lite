import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: '../src/funds-lite/index.ts' },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
})

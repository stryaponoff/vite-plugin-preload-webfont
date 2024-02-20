import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  target: 'node20',
  dts: false,
  format: ['cjs', 'esm'],
  clean: !options.watch,
  minify: !options.watch,
}))

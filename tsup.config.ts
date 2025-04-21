import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/content-selector.ts', 'src/model/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
})

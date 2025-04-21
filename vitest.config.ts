import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/integration/**/*.test.ts', 'tests/unit/**/*.test.ts'],
    testTimeout: 15000,
    coverage: {
      provider: "v8",
      include: [
        'src/**'
      ],
      exclude: [
        'src/auth/**',
        'src/model/**',
      ],
    },
    setupFiles: ['dotenv/config'],
  },
});

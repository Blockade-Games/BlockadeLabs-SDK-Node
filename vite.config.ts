import { defineConfig } from 'vitest/config';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['tests/*.ts'],
    watch: false,
    testTimeout: 300000,
  },
  plugins: [viteTsconfigPaths()],
});

import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    globals: true,
    environment: 'node',
    workspace: [
      {
        extends: true,
        test: {
          name: 'integration',
          dir: 'src/use-cases',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment:
            './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
    ],
  },
});

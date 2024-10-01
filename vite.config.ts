import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./src/database/setup-test.ts'],
    poolOptions: {
      threads: {
        singleThread: true,
        isolate: true,
        maxThreads: 1,
        minThreads: 1,
      },
      forks: {
        singleFork: true,
        maxForks: 1,
        minForks: 1,
      }
    }
  }
})

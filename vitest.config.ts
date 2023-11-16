import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      '100': true,
      all: true,
      include: ['server/src', 'web/src'],
      exclude: ['**/*.{d,lite,stories}.ts', '**/*.tsx', '**/{env,index}.ts'],
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json', 'json-summary'],
    },
  },
});

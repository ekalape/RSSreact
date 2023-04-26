/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    {
      babel: {
        plugins: [['istanbul']],
      }
    }
  ),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__test__/setup.ts',

    coverage: {
      enabled: true,
      provider: 'c8',
      all: true,
      reporter: ['text', 'json', 'html'],
      include: ['**/src/*/*.tsx', '**/src/*/*.ts'],
      exclude: ['**/vite*.ts', '**/interfaces.ts', "**/cypress/**", "**/coverage/**", "**/_test_/**"],


    },
  },
});

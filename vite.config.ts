/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    {
      babel: {
        plugins: [['istanbul']],
      }
    }
  ),
  istanbul({
    cypress: true,
    requireEnv: false,
  })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__test__/setup.ts',
    css: true,
    coverage: {
      enabled: true,
      provider: 'c8',
      all: true,
      reporter: ['text', 'json', 'html'],
      include: ['**/*.tsx', '**/*.ts'],
      exclude: ['**/main.tsx', '**/vite*.ts', '**/interfaces.ts', "**/cypress/*"],

    },
  },
});

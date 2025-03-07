import griffel from '@griffel/vite-plugin';
import plugin from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const config = defineConfig(({ command }) => ({
  plugins: [plugin(), command === 'build' && griffel()],
  server: {
    port: (process.env.VITE_PORT as unknown as number) || 5173,
  },
  resolve: {
    alias: {
      '@microsoftgraveyard': resolve(__dirname, 'app'),
    },
  },
}));

export default config;

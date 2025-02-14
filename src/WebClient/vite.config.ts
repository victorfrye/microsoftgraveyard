import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import griffel from '@griffel/vite-plugin';
import { resolve } from 'path';

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

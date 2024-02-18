/** @type {import('next').NextConfig} */
import { withGriffelCSSExtraction } from '@griffel/next-extraction-plugin';

const nextConfig = withGriffelCSSExtraction()({
  output: 'export',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.module.rules.unshift({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: '@griffel/webpack-loader',
        },
      ],
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: '@griffel/webpack-loader',
          options: {
            babelOptions: {
              presets: ['next/babel'],
            },
          },
        },
      ],
    });

    return config;
  },
});

export default nextConfig;

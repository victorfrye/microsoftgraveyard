import { withGriffelCSSExtraction } from '@griffel/next-extraction-plugin';
import { NextConfig } from 'next';

const nextConfig: NextConfig = withGriffelCSSExtraction()({
  output: 'export',
  turbopack: {},
  webpack: (config) => {
    config.module.rules.unshift(
      {
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
      }
    );

    return config;
  },
});

export default nextConfig;

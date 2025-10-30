import { withGriffelCSSExtraction } from '@griffel/next-extraction-plugin';
import { NextConfig } from 'next';

const nextConfig: NextConfig = withGriffelCSSExtraction()({
  output: 'export',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  webpack: (config) => {
    // Add Griffel loader for CSS-in-JS support
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

    // Configure SVG handling
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
});

export default nextConfig;

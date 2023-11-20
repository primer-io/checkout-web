import type { StorybookConfig } from '@storybook/react-vite';

export default {
  stories: ['../**/*.mdx', '../**/*.stories.ts{,x}'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
} satisfies StorybookConfig;

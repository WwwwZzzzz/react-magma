const path = require('path');
const toPath = _path => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../src/stories/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    'storybook-addon-performance/register',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    '@storybook/addon-controls',
  ],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
        },
      },
    };
  },
};

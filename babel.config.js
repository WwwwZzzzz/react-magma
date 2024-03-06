module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [['@emotion', { autoLabel: 'dev-only' }]],
    env: {
      test: {
        plugins: ['dynamic-import-node'],
        presets: [
          '@babel/preset-react',
          '@babel/preset-typescript',
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: '3.*.*'
            }
          ]
        ]
      }
    }
  }
};

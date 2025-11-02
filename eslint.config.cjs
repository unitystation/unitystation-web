const next = require('eslint-config-next');

module.exports = [
  ...next,
  {
    ignores: [
      'jest.config.js',
      'postcss.config.js',
      'tailwind.config.js',
      'next.config.js',
      'cypress/**',
    ],
  },
];

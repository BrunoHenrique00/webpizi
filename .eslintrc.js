module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'no-console': ['error', { allow: ['debug', 'error', 'log'] }],
    'import/extensions': [2, { js: 'never', ts: 'never', tsx: 'never' }],
    'import/no-import-module-exports': ['error', { exceptions: ['**/*/index.ts'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  'ignorePatterns': ['bin']
};

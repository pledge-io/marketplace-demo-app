module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    browser: true
  },
  extends: [
      'standard',
      'plugin:prettier/recommended'
  ],
  plugins: ['jest', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }]
  },
  ignorePatterns: []
}

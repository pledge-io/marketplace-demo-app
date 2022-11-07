module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: 'standard',
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {},
  ignorePatterns: []
}

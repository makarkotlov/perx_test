module.exports = {
  extends: [
    'airbnb',
    'prettier',
  ],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-danger': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-shadow': 0,
    'no-bitwise': ['error', { allow: ['^'] }],
    'no-underscore-dangle': ['off', { enforceInMethodNames: true }],
  },
  settings: {
    'import/core-modules': ['react'],
  },
  plugins: ['import'],
}

// @ts-nocheck

module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-undef": "off"
  }
};

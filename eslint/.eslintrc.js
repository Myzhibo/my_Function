module.exports = {
  root: true,

  env: { node: true },

  extends: ['plugin:vue/essential', '@vue/eslint-config-standard', 'hexin'],

  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },

  // parser: '@vue/eslint-parser',
  // plugins: ['@typescript-eslint'],
  rules: {},

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '*.vue',
      ],
      env: { jest: true },
    },
  ],
};

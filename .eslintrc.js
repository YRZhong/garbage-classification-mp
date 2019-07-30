module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    'eslint:recommended',
    'prettier/vue'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-console': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'flow'
      }
    ]
  }
};

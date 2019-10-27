const path = require('path');

module.exports = {
  root: true,

  parserOptions: {
		parser: "babel-eslint",
		ecmaVersion: 8,
		sourceType: "module"
	},

  env: {
    node: true,
    'jest/globals': true
  },

  extends: [
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:jest/all'
  ],

  plugins: ['vue', 'jest'],

  settings: {
      'import/extensions': [
          ".js",
          ".jsx"
      ]
  },

  rules: {
    indent: [
      'error',
      4
    ],
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false
      }
    ],
    'arrow-body-style': [
      'error',
      'always'
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-prototype-builtins': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'prefer-promise-reject-errors': 'off',
    'function-paren-newline': 'off',
    'no-console': 'off',
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'max-len': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/html-self-closing': 'off',
    'no-debugger': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'import/extensions': 'off',
    eqeqeq: 'off',
    'import/prefer-default-export': 'off',
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/no-restricted-syntax': 'error',
    'vue/object-curly-spacing': 'error',
    'vue/space-unary-ops': 'error',
    'vue/v-on-function-call': 'error',
    'vue/camelcase': 'error'
  }
};

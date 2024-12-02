import { defineFlatConfig } from 'eslint-define-config';
import prettier from 'eslint-plugin-prettier';

export default defineFlatConfig([
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly',
        console: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error'
    },
  },
]);
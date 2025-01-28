import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      'no-console': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'warn',
      'typescript-eslint/no-explicit-any': 'off',
    },
  },
];

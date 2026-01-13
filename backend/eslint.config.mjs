import pluginJs from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // TypeScript/Decorator specific rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Decorator formatting rules
      indent: 'off', // Let Prettier handle indentation
      '@typescript-eslint/indent': 'off', // Let Prettier handle TypeScript indentation

      // General formatting rules that work with Prettier
      semi: ['error', 'never'],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1, // Maximum of 1 consecutive empty line
          maxEOF: 0, // No empty lines at end of file
          maxBOF: 0, // No empty lines at beginning of file
        },
      ],
      'no-trailing-spaces': 'error', // Remove trailing whitespace including empty lines with spaces

      // Comma rules - avoid useless trailing commas (compatible with Prettier's "es5" setting)
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline', // Trailing comma in multiline arrays
          objects: 'always-multiline', // Trailing comma in multiline objects
          imports: 'always-multiline', // Trailing comma in multiline imports
          exports: 'always-multiline', // Trailing comma in multiline exports
          functions: 'never', // Never trailing comma in function parameters/calls (ES5 compatible)
        },
      ],

      // TypeScript decorator rules
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/unified-signatures': 'error',
    },
  },
  // Special rules for DTO files with many decorators
  {
    files: ['**/dto/*.ts', '**/*.dto.ts'],
    rules: {
      'lines-between-class-members': 'off', // Disable for DTO files
    },
  },
  // General class member spacing rule for other files
  {
    files: ['**/*.ts'],
    ignores: ['**/dto/*.ts', '**/*.dto.ts'],
    rules: {
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
    },
  }
)

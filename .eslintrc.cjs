// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react-refresh',
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {}
    }
  },
  ignorePatterns: [
    '/.vscode',
    '/coverage',
    '/dist',
    '/node_modules',
    '/patches',
    '/scripts',
    '/webpackConf',
    'webpack.config.js',
    'tailwind.config.js',
    'postcss.config.js',
    'postcss.config.js',
    'postcss.config.js'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        jsxSingleQuote: true,
        semi: false,
        trailingComma: 'none',
        endOfLine: 'auto',
        bracketSameLine: true,
        bracketSpacing: true,
        arrowParens: 'always',
        jsxBracketSameLine: true
      }
    ]
  }
}

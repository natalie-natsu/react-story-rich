module.exports = {
  root: true, // So parent files don't get applied
  globals: {
    preval: false, // Used in the documentation
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['plugin:import/recommended', 'airbnb'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: ['babel', 'jest', 'react-hooks', 'markdown'],
  /**
   * Sorted alphanumerically within each group. built-in and each plugin form
   * their own groups.
   */
  rules: {
    'curly': ['error', 'all'],
    'consistent-this': ['error', 'self'],
    'linebreak-style': 'off', // Doesn't play nicely with Windows
    'quotes': ["error", "single", { "allowTemplateLiterals": true }],
    'no-alert': 'error',
    // Strict, airbnb is using warn
    'no-console': 'error',
    'no-constant-condition': 'error',
    // Airbnb use error
    'no-param-reassign': 'off',
    'no-prototype-builtins': 'off',
    'no-underscore-dangle': 'off',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'prefer-destructuring': 'off', // Destructuring harm grep potential.

    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off', // deprecated
    'jsx-a11y/no-autofocus': 'off', // We are a library, people do what they want.

    // This rule is great for raising people awareness of what a key is and how it works.
    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'off',
    // It's buggy
    'react/forbid-prop-types': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-handler-names': [
      'error',
      {
        // airbnb is disabling this rule
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/no-danger': 'error',
    // Strict, airbnb is using off
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'off',
    'react/no-multi-comp': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/sort-prop-types': 'error',

    'import/no-extraneous-dependencies': 'off', // It would be better to enable this rule.
    'import/namespace': ['error', { allowComputed: true }],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    "object-curly-newline": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".md"] }],
    "import/prefer-default-export": 0,
  },
  overrides: [
    {
      files: [
        '**/test-utils/**/*.js',
        // matching the pattern of the test runner
        '*.test.js',
        '*.int-test.js',
      ],
      env: {
        browser: true,
        node: true,
        jest: true,
      },
      rules: {
        // does not work with wildcard imports. Mistakes will throw at runtime anyway
        'import/named': 0,
        // for expect style assertions
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ["**/*.md"],
      rules: {
        "no-console": "off",
        'no-unused-expressions': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      alias: [
        ['@react-story-rich/core', './packages/react-story-rich/src'],
        ['@react-story-rich/ui', './packages/react-story-rich-ui/src'],
      ]
    }
  }
};

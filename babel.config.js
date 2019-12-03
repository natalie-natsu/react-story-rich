let defaultPresets;

if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm', 'production-umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
      },
    ],
  ];
}

const defaultAlias = {
  '@react-story-rich/core': './packages/react-story-rich/src',
  '@react-story-rich/lab': './packages/react-story-rich-lab/src',
  '@react-story-rich/ui': './packages/react-story-rich-lab/ui',
};

const productionPlugins = [
  'babel-plugin-transform-react-constant-elements',
  'babel-plugin-transform-dev-warning',
  ['babel-plugin-react-remove-properties', { properties: ['data-rsr-test'] }],
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
];

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    'babel-plugin-optimize-clsx',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-runtime',
    // for IE 11 support
    '@babel/plugin-transform-object-assign',
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    cjs: {
      plugins: productionPlugins,
    },
    coverage: {
      plugins: [
        'babel-plugin-istanbul',
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: defaultAlias,
          },
        ],
      ],
    },
    development: {
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              modules: './modules',
            },
          },
        ],
      ],
    },
    esm: {
      plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
    },
    es: {
      plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
    },
    production: {
      plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
    },
    'production-umd': {
      plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
    },
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: defaultAlias,
          },
        ],
      ],
    },
    benchmark: {
      plugins: [
        ...productionPlugins,
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: defaultAlias,
          },
        ],
      ],
    },
  },
};

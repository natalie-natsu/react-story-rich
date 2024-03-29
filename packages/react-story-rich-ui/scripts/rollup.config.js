import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './src/index.js';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const babelOptions = {
  exclude: /node_modules/,
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true,
  configFile: '../../babel.config.js',
};
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../../node_modules/clsx/index.js': [
      'clsx',
    ],
    '../../node_modules/lodash/index.js': [
      'isEmpty',
      'noop',
      'pickBy',
      'uniqueId',
    ],
    '../../node_modules/prop-types/index.js': [
      'array',
      'arrayOf',
      'bool',
      'elementType',
      'func',
      'instanceOf',
      'node',
      'number',
      'object',
      'shape',
      'string',
    ],
    '../../node_modules/react-is/index.js': [
      'ForwardRef',
    ],
    '../../node_modules/react-story-rich/core/index.js': [
      'Navigation',
      'useEnabled',
      'useFocus',
      'useTap',
      'useTimeout',
    ],
  },
};

function onwarn(warning) {
  throw Error(warning.message);
}

export default [
  {
    input,
    onwarn,
    output: {
      file: 'build/umd/react-story-rich-ui.development.js',
      format: 'umd',
      name: 'ReactStoryRichUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },
  {
    input,
    onwarn,
    output: {
      file: 'build/umd/react-story-rich-ui.production.min.js',
      format: 'umd',
      name: 'ReactStoryRichUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot({ snapshotPath: 'size-snapshot.json' }),
      terser(),
    ],
  },
];

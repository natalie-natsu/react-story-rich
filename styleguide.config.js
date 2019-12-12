const path = require('path');

module.exports = {
  title: 'react-story-rich Documentation',
  template: {
    favicon: './favicon.ico',
  },
  sections: [{
    name: 'react-story-rich',
    content: 'README.md',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
  }, {
    name: 'Core API',
    components: 'packages/react-story-rich/src/**/+([A-Z]*)/*.js',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
    usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
    sections: [{
      name: 'Actions',
      content: 'documentation/actions.md',
    }],
  }, {
    name: 'Examples',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
    usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
    sections: [{
      name: 'Custom Element',
      content: 'documentation/CustomElement.md',
    }, {
      name: 'Small sequence',
      content: 'documentation/SmallSequence.md',
    }],
  }, {
    name: 'UI',
    content: 'packages/react-story-rich-ui/README.md',
    components: 'packages/react-story-rich-ui/src/**/+([A-Z]*)/*.js',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
    usageMode: 'expand', // 'hide' | 'collapse' | 'expand'],
  }, {
    name: 'Lab',
    content: 'packages/react-story-rich-lab/README.md',
    components: 'packages/react-story-rich-lab/src/**/+([A-Z]*)/*.js',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
    usageMode: 'expand', // 'hide' | 'collapse' | 'expand'],
  }, {
    name: 'Troubleshooting',
    content: 'TROUBLESHOOTING.md',
  }, {
    name: 'Exposition',
    content: 'EXPO.md',
  }, {
    name: 'Changelog',
    content: 'CHANGELOG.md',
  }],
  webpackConfig: {
    context: path.resolve(__dirname),
    resolve: {
      modules: [path.join(__dirname, '../'), 'node_modules'],
      alias: {
        '@react-story-rich/core': path.resolve(__dirname, './packages/react-story-rich/src'),
        '@react-story-rich/lab': path.resolve(__dirname, './packages/react-story-rich-lab/src'),
        '@react-story-rich/ui': path.resolve(__dirname, './packages/react-story-rich-lab/ui'),
      },
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/build/',
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      }, {
        test: /\.md$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      }],
    },
  },
};

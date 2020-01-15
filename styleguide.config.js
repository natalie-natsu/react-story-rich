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
    name: 'Core Components',
    components: 'packages/react-story-rich/src/+([A-Z]*)/*.js',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
    usageMode: 'expand', // 'hide' | 'collapse' | 'expand',
  }, {
    name: 'Core Classes',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
    usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
    sections: [{
      name: 'Route',
      content: 'packages/react-story-rich/documentation/Route.md',
    }, {
      name: 'Navigation',
      content: 'packages/react-story-rich/documentation/Navigation.md',
    }, {
      name: 'Knot',
      content: 'packages/react-story-rich/documentation/Knot.md',
    }],
  }, {
    name: 'Styled Components',
    content: 'packages/react-story-rich-ui/README.md',
    components: 'packages/react-story-rich-ui/src/+([A-Z]*)/*.js',
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
  }, {
    name: 'Contributors',
    content: 'CONTRIBUTORS.md',
  }],
  webpackConfig: {
    context: path.resolve(__dirname),
    resolve: {
      modules: [path.join(__dirname, '../'), 'node_modules'],
      alias: {
        '@react-story-rich/core': path.resolve(__dirname, './packages/react-story-rich/src'),
        '@react-story-rich/ui': path.resolve(__dirname, './packages/react-story-rich-ui/src'),
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

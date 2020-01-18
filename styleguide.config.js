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
    name: 'Styled Components',
    content: 'packages/react-story-rich-ui/README.md',
    components: 'packages/react-story-rich-ui/src/components/+([A-Z]*)/*.js',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
    usageMode: 'expand', // 'hide' | 'collapse' | 'expand'],
  }, {
    name: 'Core',
    components: 'packages/react-story-rich/src/components/*/*.js',
    exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
    usageMode: 'expand', // 'hide' | 'collapse' | 'expand',
    sections: [{
      name: 'Classes',
      sections: [
        { name: 'Navigation', content: 'packages/react-story-rich/src/classes/Navigation/Navigation.md' },
        { name: 'Route', content: 'packages/react-story-rich/src/classes/Route/Route.md' },
      ],
    }],
  }, {
    name: 'Hooks',
    content: 'documentation/HOOKS.md',
    sections: [{
      name: 'Handlers & UI',
      sections: [
        { name: 'useActions', content: 'packages/react-story-rich-ui/src/hooks/useActions/useActions.md' },
        { name: 'useProgress', content: 'packages/react-story-rich-ui/src/hooks/useProgress/useProgress.md' },
        { name: 'useTap', content: 'packages/react-story-rich/src/hooks/useTap/useTap.md' },
      ],
    }, {
      name: 'Effects',
      sections: [
        { name: 'useEnabled', content: 'packages/react-story-rich/src/hooks/useEnabled/useEnabled.md' },
        { name: 'useTimeout', content: 'packages/react-story-rich/src/hooks/useTimeout/useTimeout.md' },
      ],
    }, {
      name: 'Utils',
      sections: [
        { name: 'useChunk', content: 'packages/react-story-rich/src/hooks/useChunk/useChunk.md' },
      ],
    }],
  }, {
    name: 'Troubleshooting',
    content: 'documentation/TROUBLESHOOTING.md',
  }, {
    name: 'Exposition',
    content: 'documentation/EXPOSITION.md',
  }, {
    name: 'Contributors',
    content: 'documentation/CONTRIBUTORS.md',
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

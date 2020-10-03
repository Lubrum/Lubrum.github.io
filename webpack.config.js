// Webpack
require('webpack');

// Modules
const path = require('path');

// Configuration
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'assets/js/main-transitions.js'),
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    publicPath: '{{ site.url }}/assets/js/',
    filename: 'main-transitions.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
          path.resolve('..', 'src')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: [
                    '> 0.25%',
                    'edge >= 14',
                    'not ie <= 10',
                    'not op_mini all'
                  ]
                },
                corejs: 3,
                useBuiltIns: 'usage'
              }]
            ],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'highway': 'build/highway.js'
    },
    modules: ['.', 'node_modules'],
    extensions: ['.js']
  }
};
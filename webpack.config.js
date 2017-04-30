const path = require('path')

module.exports = {
  entry: './public/entry.jsx',
  output: {
    path: path.resolve(__dirname + '/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
  }
}

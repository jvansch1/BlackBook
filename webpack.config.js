const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: './public/entry.jsx',
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: "./bundle.js.map",
    path: path.resolve(__dirname + '/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
      { test: /\.json$/, loader: 'json' },
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
  }
}

var path = require('path')
var webpack = require('webpack')

// laravel project
// -----------------------------
// var BUILD_DIR = path.resolve(__dirname, '../../../public/js')
// var APP_DIR = path.resolve(__dirname, './resources/assets/js/')
// var CONTENT_BASE = path.resolve(__dirname, './resources/views/')

// standart project
// -----------------------------
var BUILD_DIR = path.resolve(__dirname, './public/js')
var APP_DIR = path.resolve(__dirname, './src')
var CONTENT_BASE = path.resolve(__dirname, './')

module.exports =  {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    publicPath: 'public/js',
    filename: 'build.js'
  },
  devServer: {
    inline: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    contentBase: CONTENT_BASE
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "fast-sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    
        query: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
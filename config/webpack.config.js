const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

// must match config.webpack.dev_server.port
const devServerPort = 3808

// set NODE_ENV=production on the environment to add asset fingerprints
const production = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    'application': './webpack/application.js'
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'react',
            'stage-0'
          ],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
            'transform-es2015-template-literals'
          ],
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader",
            options: {includePaths: ["./webpack/style"]}
          }
        ]
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'public', 'webpack'),
    publicPath: '/webpack/',
    filename: production ? '[name]-[chunkhash].js' : '[name].js'
  },

  resolve: {
    modules: [
      path.join(__dirname, '..', 'webpack'),
      "node_modules"
    ],
    extensions: ['.js', '.jsx']
  },

  plugins: [
    // Poly-fills
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    })]
}

config.plugins.push(
  new webpack.NoEmitOnErrorsPlugin()
)

if (production) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
  );
} else {
  config.plugins.push(
    new webpack.NamedModulesPlugin()
  )
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/'
  // Source maps
  config.devtool = 'eval-source-map'
}

module.exports = config

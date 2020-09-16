const path = require('path')
const srcPath = path.join(__dirname, '../src')
const dictPath = path.join(__dirname, '../dist')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'
const env = process.env.NODE_ENV || 'development'
module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? '' : 'eval-source-map',
  entry: {
    index: path.join(srcPath, 'index.tsx'),
    vendors: ['react', 'react-dom'],
  },
  output: {
    path: dictPath,
    filename: 'js/[name].[hash:8].js',
    publicPath: '',
  },
  devServer: {
    host: 'localhost',
    port: 3015,
    hot: true,
    inline: true,
    contentBase: ['./'],
    publicPath: '/',
    historyApiFallback: true, //用于如果找不到界面就返回默认首页
    // disableHostCheck: true
  },
  resolve: {
    alias: {
      '@': srcPath,
      '~': path.join(__dirname, '../'),
    },
    extensions: ['.js', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [srcPath],
        exclude: [/node_mudules/],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less?$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HTMLWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      // allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: `"${env}"` }
    })
  ],
  // 核心配置
  optimization: {
    splitChunks: {
      cacheGroups: {
        //打包公共模块
        commons: {
          chunks: 'initial', //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          name: 'commons', //提取出来的文件命名
        },
      },
    },
  },
}

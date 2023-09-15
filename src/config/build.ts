const path = require('path')
const srcPath = path.join(__dirname, '../../src')
const dictPath = path.join(__dirname, '../../dist')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
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
    // host: 'localhost',
    host: '0.0.0.0',
    port: 3015,
    hot: true,
    open: true,
    // inline: true,
    // contentBase: ['./'],
    // publicPath: '/',
    historyApiFallback: true, //用于如果找不到界面就返回默认首页
    // disableHostCheck: true
    headers: {
      // 用于解决webpack-dev-server热更新时，浏览器控制台报错：Content Encoding Error
      //解决threejs加载gltf模型时，浏览器无法获取模型数据总大小的问题
      'Content-Encoding': 'none',
    },
    client: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      '@': srcPath,
      '~': path.join(srcPath, '../'),
    },
    extensions: ['.js', '.tsx', '.ts', '.json'],
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
        test: /\.json$/,
        loader: "url-loader",
        options: {
          esModule: false,
          name: 'json/[name].[hash:8].[ext]',
        },
        type: 'javascript/auto'
      },
      {
        test: /\.(jpg|png|jpeg|gif|webp)$/,
        loader: "url-loader",
        options: {
          limit: 5 * 1024,
          esModule: false,
          name: 'img/[name].[hash:8].[ext]',
        },
        type: 'javascript/auto'
      },
      // {
      //   test: /\.(jpg|png|jpeg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 1024,
      //         fallback: {
      //           loader: 'file-loader',
      //           options: {
      //             name: 'img/[name].[hash:8].[ext]',
      //           },
      //         },
      //       },
      //     },
      //   ],
      //   type: 'javascript/auto'
      // },
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
      {
        test: /\.glsl$/,
        use: [
          {
            loader: "webpack-glsl-loader",
          },
        ],
      },
      {
        test: /\.(glb|gltf)$/,
        use:
          [
            {
              loader: 'file-loader',
              options:
              {
                // outputPath: 'assets/models/'
              }
            }
          ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HTMLWebpackPlugin({
      // template: path.join(srcPath, 'index.html'),
      template: path.join(srcPath, '../public/index.html')
    }),
    new CopyWebpackPlugin({
      // 需拷贝的配置项
      patterns: [
        {
          from: "public", // 从哪里 copy
          // to: '', 这里可以省略 to，自动从 output 的 path 去找
          globOptions: {
            ignore: ['**/index.html']
            // 这里必须在前面加 **/ 表示从当前路径下忽略
            // 且忽略目录中文件后不能为空
          }
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      // allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: `"${env}"` },
      'BASE_URL': "'./'"
    })
  ],
  // 核心配置
  optimization: {
    nodeEnv: false, // 防止webpack将process.env.NODE_ENV设置为production //https://blog.csdn.net/weixin_42349568/article/details/124229170
    runtimeChunk: 'single', //将runtime代码单独打包 解决无法热更新问题
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

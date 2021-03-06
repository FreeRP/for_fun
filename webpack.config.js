const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  if (argv.mode === 'development')
    return {
      mode: 'development',
      entry: "./src/app.tsx",
      output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/',
        hashFunction: "sha256" // Fix error: "digital envelope routines::unsupported"
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            resolve: {
              extensions: ['.ts', '.tsx'],
            },
            use: 'ts-loader',
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ]
      },
      devtool: 'source-map',
      plugins: [
        new HtmlWebpackPlugin({
          template: 'src/templates/index.html',
        }),
        new MiniCssExtractPlugin(),
      ],
    };
};

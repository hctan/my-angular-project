const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AngularWebpackPlugin } = require('@ngtools/webpack');

module.exports = {
  entry: './src/main.ts', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file
    clean: true, // Clean the output directory before each build
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Process TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/, // Process HTML files
        use: 'html-loader',
      },
      {
        test: /\.css$/, // Process CSS files
        use: ['to-string-loader', 'css-loader'], // Convert CSS to strings for Angular
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use the index.html file as a template
    }),
    new AngularWebpackPlugin({
        tsConfigPath: './tsconfig.json', // Path to your tsconfig.json
        entryModule: './src/app/app.module#AppModule', // Path to your AppModule
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve files from the output directory
    compress: true, // Enable gzip compression
    port: 4200, // Development server port
    open: true, // Automatically open the browser
  },
};
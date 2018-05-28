// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const autoprefixer = require("autoprefixer");


module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      // add your custom rules.
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 32768
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          }, 
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]_[local]"
            }
          }, 
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  autoprefixer
                ];
              }
            }
          }, 
          {
            loader: "less-loader"
          }
        ]
      }
    ],
  },
};

module.exports = function(api) {
  api.cache(false);

  const plugins = [
      "@babel/plugin-syntax-dynamic-import",
      "react-hot-loader/babel",
  ];

  const presets = [
      "@babel/preset-env",
      "@babel/preset-react"
  ];

  return {
      plugins,
      presets,
  }

};
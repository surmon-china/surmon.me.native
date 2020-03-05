module.exports = api => {
  const plugins = [["@babel/plugin-proposal-decorators", { legacy: true }]]

  if (api.env() !== 'development') {
    plugins.push(['transform-remove-console', {exclude: ['error']}]);
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: plugins
  }
};

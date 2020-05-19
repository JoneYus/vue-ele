
module.exports = function (api) {

  api.cache(true);

  const presets = [];

  const plugins = [];

  return {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ],
    plugins

  };

}

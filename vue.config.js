module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: tag => {
            const isCustom = tag === 'create-assistant';
            if (isCustom) {
              console.log(`[Custom Element Detected]: ${tag}`); // Log custom element detection to DevTools
            }
            return isCustom;
          }
        };
        return options;
      });

    // Silence Webpack logs
    config.stats({
      all: false,
      warnings: true,
      errors: true,
    });
  },
  configureWebpack: {
    performance: {
      hints: false,
    },
  },
  productionSourceMap: true, // Disable source maps in production
};

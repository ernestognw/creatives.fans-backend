const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@components": path.resolve(__dirname, "src/components"),
      "@views": path.resolve(__dirname, "src/views"),
      "@config": path.resolve(__dirname, "src/config"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@graphql": path.resolve(__dirname, "src/graphql"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-reanimated/plugin"],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./src/components",
            "@features": "./src/features",
            "@data": "./src/data",
            "@assets": "./assets",
            "@utils": "./src/utils",
            "@screens": "./src/screens",
            "@navigations": "./src/navigations",
            "@assets": "./src/assets",
            "@services": "./src/services",
          },
        },
      ],
    ],
  };
};

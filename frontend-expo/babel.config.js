module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Ważne: jsxImportSource musi być ustawione na nativewind
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin", // Musi być na samym końcu
    ],
  };
};

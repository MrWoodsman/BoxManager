module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      // Inne pluginy...
      "react-native-reanimated/plugin", // <--- TO MUSI BYĆ NA SAMYM KOŃCU
    ],
  };
};

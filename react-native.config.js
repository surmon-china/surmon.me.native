module.exports = {
  assets: ["./src/assets/fonts/"],
  dependencies: {
    'react-native-splash-screen': {
      platforms: {
        ios: null
      }
    },
    // FIXME: async-storage has not support rn 0.60.x
    '@react-native-community/async-storage': {
      platforms: {
        ios: null,
        android: null
      }
    }
  },
};
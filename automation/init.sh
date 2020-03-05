
rm -rf node_modules/

# Install dependencies
yarn

# Sentry
yarn sentry-wizard -i reactNative -p ios android

# IOS
cd ios && pod install && cd ..

# Android (reactnavigation)
# https://reactnavigation.org/docs/getting-started/#installing-dependencies-into-a-bare-react-native-project

# link assets
react-native link

# Now you can run the app with dev
# yarn ios
# yarn android

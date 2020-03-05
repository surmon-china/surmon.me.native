
# update versions
yarn postversion

# build ios -> XCode
echo 'Build IOS now! and goon'
# exit

# build Android apk
yarn release:android

# bundle source-map
yarn bundle:android
yarn bundle:ios

# upload source-map to sentry.io
export SENTRY_PROPERTIES=./android/.sentry.properties
node ./sentry.js

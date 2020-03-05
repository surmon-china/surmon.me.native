
# update versions
yarn postversion

# build Android apk
yarn release:android

# build ios -> XCode
echo 'Build IOS now! and goon'
exit

# bundle source-map
yarn bundle:android
yarn bundle:ios

# upload source-map to sentry.io
export SENTRY_PROPERTIES=./android/.sentry.properties
node ./sentry.js

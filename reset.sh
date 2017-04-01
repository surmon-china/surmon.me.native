rm -rf node_modules && npm install
watchman watch-del-all
npm start -- --reset-cache

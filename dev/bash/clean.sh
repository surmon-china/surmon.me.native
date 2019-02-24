watchman watch-del-all
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/haste-*
rm -rf $TMPDIR/metro-*
npm start -- --reset-cache
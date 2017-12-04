/*
*
* handleBackBtnPress service
*
*/

import { Alert, BackAndroid } from 'react-native';

export default function() {
  if (this.props.navigator.getCurrentRoutes().length <= 1) {
    Alert.alert(
      '退出',
      '想好了？',
      [
        {text: '没', onPress: () => console.log('Cancel Pressed!')},
        {text: '恩', onPress: () => BackAndroid.exitApp()},
      ]
    )
  } else {
    this.props.navigator.pop();
  }
  return true;
}

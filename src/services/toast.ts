
import Toast, { ToastOptions } from 'react-native-root-toast';
import * as fonts from '@app/style/fonts';

export const showToast = (message: string, options?: ToastOptions): void => {
  Toast.show(message || '未知错误', Object.assign({
    duration: 300,
    position: -70,
    shadow: false,
    animation: true,
    hideOnPress: true,
    textStyle: {
      fontSize: fonts.base.fontSize
    },
    delay: 0
  }, options));
}

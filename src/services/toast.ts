
import Toast, { ToastOptions } from 'react-native-root-toast'
import i18n from '@app/services/i18n'
import { LANGUAGE_KEYS } from '@app/constants/language'
import fonts from '@app/style/fonts'

export function showToast(message: string, options?: ToastOptions): void {
  Toast.show(
    message || i18n.t(LANGUAGE_KEYS.UNKNOW_ERROR),
    Object.assign({
      delay: 0,
      duration: 300,
      position: -70,
      shadow: false,
      animation: true,
      hideOnPress: true,
      textStyle: {
        fontSize: fonts.base.fontSize
      }
    }, options)
  )
}

export default showToast

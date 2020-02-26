/**
 * Toast service
 * @file 吐司服务
 * @module app/services/toast
 * @author Surmon <https://github.com/surmon-china>
 */

import Toast, { ToastOptions } from 'react-native-root-toast'
import { LANGUAGE_KEYS } from '@app/constants/language'
import i18n from '@app/services/i18n'
import fonts from '@app/style/fonts'

export const showToast = (message: string, options?: ToastOptions): void => {
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

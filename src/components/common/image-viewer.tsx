/**
 * ImageViewerModal
 * @file 图片滑动浏览控件
 * @module app/components/common/image-viewer
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { observer } from 'mobx-react/native'
import { AutoActivityIndicator } from './activity-indicator'
import { LANGUAGE_KEYS } from '@app/constants/language'
import i18n from '@app/services/i18n'

export interface IImageViewerModalProps {
  images: string[]
  index?: number
  visible: boolean
  onClose(): void
}

export const ImageViewerModal = observer((props: IImageViewerModalProps): JSX.Element => {
  const images = props.images.map(url => ({ url }))
  return (
    <Modal visible={props.visible} transparent={true}>
      <ImageViewer
        index={props.index}
        imageUrls={images}
        menuContext={{
          saveToLocal: i18n.t(LANGUAGE_KEYS.SAVE),
          cancel: i18n.t(LANGUAGE_KEYS.CANCEL)
        }}
        onCancel={props.onClose}
        onClick={props.onClose}
        loadingRender={() => (
          <AutoActivityIndicator size="large" />
        )}
      />
    </Modal>
  )
})

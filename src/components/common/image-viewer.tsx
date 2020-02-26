/* eslint-disable react-native/no-inline-styles */
/**
 * ImageViewerModal
 * @file 图片滑动浏览控件
 * @module app/components/common/image-viewer
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react'
import { SafeAreaView, Text, Modal, View } from 'react-native'
import ImageView from 'react-native-image-viewing'
import { observer } from 'mobx-react'
import { Dark } from '@app/style/colors'
import mixins from '@app/style/mixins'
import sizes from '@app/style/sizes'
import { IS_ANDROID } from '@app/config'

export interface IImageViewerModalProps {
  images: string[]
  index?: number
  visible: boolean
  onClose(): void
}

export const ImageViewerModal = observer((props: IImageViewerModalProps): JSX.Element => {
  const images = props.images.map(uri => ({ uri }))
  const viewElement = (
    <ImageView
      imageIndex={props.index || 0}
      images={images}
      visible={props.visible}
      onRequestClose={props.onClose}
      FooterComponent={props => (
        <SafeAreaView>
          <Text style={{
            ...mixins.center,
            marginBottom: sizes.gap,
            color: Dark.textDefault,
            textAlign: 'center'
          }}>
            {props.imageIndex + 1} / {images.length}
          </Text>
        </SafeAreaView>
      )}
    />
  )

  // WORDAROUND
  if (IS_ANDROID) {
    return (
      <Modal visible={props.visible}>
        <View style={{ flex: 1, backgroundColor: Dark.background }}>
          {viewElement}
        </View>
      </Modal>
    )
  }

  return viewElement
})

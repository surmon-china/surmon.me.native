
import React, { Component } from 'react'
import { Modal } from 'react-native'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react/native'
import { boundMethod } from 'autobind-decorator'
import ImageViewer from 'react-native-image-zoom-viewer'
import { AutoActivityIndicator } from './activity-indicator'

interface IImageViewerModalProps {
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
        onCancel={props.onClose}
        onClick={props.onClose}
        loadingRender={() => <AutoActivityIndicator size="large" />}
      />
    </Modal>
  )
})


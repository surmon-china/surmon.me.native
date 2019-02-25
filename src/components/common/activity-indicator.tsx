
import React from 'react'
import { observer } from 'mobx-react/native'
import { ActivityIndicator, ViewStyle } from 'react-native'
import { IS_IOS } from '@app/config'
import colors from '@app/style/colors'

interface IProps {
  size?: number | 'small' | 'large'
  style?: ViewStyle
}

export const AutoActivityIndicator = observer((props: IProps): JSX.Element => {
  return (
    <ActivityIndicator
      animating={true}
      style={props.style}
      size={props.size || 'small'}
      color={IS_IOS ? colors.secondary : colors.primary}
    />
  )
})

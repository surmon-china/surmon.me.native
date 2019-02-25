
import React from 'react'
import { observer } from 'mobx-react/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '@app/style/colors'

interface IProps {
  size?: number
  style?: any
  color?: string
}

export const Remind = observer((props: IProps): JSX.Element => {
  return (
    <FontAwesome
      style={props.style}
      size={props.size || 8}
      color={props.color || colors.red}
      name="circle"
    />
  )
})

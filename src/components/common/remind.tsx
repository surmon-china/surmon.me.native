/**
 * Remind
 * @file 小红点控件
 * @module app/components/common/remind
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react'
import { observer } from 'mobx-react/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import colors from '@app/style/colors'

interface IRemindProps {
  size?: number
  style?: any
  color?: string
}

export const Remind = observer((props: IRemindProps): JSX.Element => {
  return (
    <Ionicon
      style={props.style}
      size={props.size || 10}
      color={props.color || colors.red}
      name="ios-egg"
    />
  )
})

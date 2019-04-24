
import React from 'react'
import { TouchableOpacity as TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { observer } from 'mobx-react/native'
import { IChildrenProps } from '@app/types/props'
import sizes from '@app/style/sizes'

export const TouchableView = observer((props: TouchableOpacityProps & IChildrenProps): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={sizes.touchOpacity}
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  )
})

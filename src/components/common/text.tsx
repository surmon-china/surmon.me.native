
import React from 'react'
import { Text as RNText } from 'react-native'
import { observer } from 'mobx-react/native'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'

export const Text = observer((props: any): JSX.Element => {
  return (
    <RNText
      {...props}
      style={[
        {
          color: colors.textDefault,
          fontFamily: fonts.fontFamily
        },
        props.style
      ]}
    >
      {props.children}
    </RNText>
  )
})

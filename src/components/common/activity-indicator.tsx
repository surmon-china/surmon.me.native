/**
 * AutoActivityIndicator
 * @file 加载指示器控件
 * @module app/components/common/activity-indicator
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react'
import { ActivityIndicator, View, ViewStyle, TextStyle } from 'react-native'
import { observer } from 'mobx-react/native'
import { Text } from './text'
import { IS_IOS } from '@app/config'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'
import mixins from '@app/style/mixins'

export interface IAutoActivityIndicatorProps {
  size?: number | 'small' | 'large'
  style?: ViewStyle
  text?: string
  textStyle?: TextStyle
}

export const AutoActivityIndicator = observer((props: IAutoActivityIndicatorProps): JSX.Element => {

  const getIndicator = (style?: ViewStyle | null) => (
    <ActivityIndicator
      animating={true}
      style={style}
      size={props.size || 'small'}
      color={IS_IOS ? colors.secondary : colors.primary}
    />
  )

  if (props.text) {
    return (
      <View style={[{ ...mixins.colCenter }, props.style]}>
        {getIndicator(null)}
        <Text
          style={[
            { marginTop: 5, ...fonts.small, color: colors.textSecondary },
            props.textStyle
          ]}
        >
          {props.text}
        </Text>
      </View>
    )
  }

  return getIndicator(props.style)
})

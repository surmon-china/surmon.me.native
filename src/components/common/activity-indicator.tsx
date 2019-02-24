
import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { ActivityIndicator, ViewStyle } from 'react-native'
import { IS_IOS } from '@app/config'
import colors from '@app/style/colors'

interface IProps {
  size?: number | 'small' | 'large'
  style?: ViewStyle
}

@observer export class AutoActivityIndicator extends Component<IProps> {
  
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <ActivityIndicator
        animating={true}
        size={this.props.size || 'small'} 
        color={IS_IOS ? colors.secondary : colors.primary}
        style={this.props.style}
      />
    )
  }
}

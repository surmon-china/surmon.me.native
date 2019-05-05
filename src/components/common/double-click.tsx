/**
 * DoubleClick
 * @file 双击控件
 * @module app/components/common/double-click
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { boundMethod } from 'autobind-decorator'

export interface IDoubleClickProps {
  onDoubleClick(): void
  onPress?(): void
  style?: StyleProp<ViewStyle>
  delay?: number
}

@observer
export class DoubleClick extends Component<IDoubleClickProps> {

  constructor(props: IDoubleClickProps) {
    super(props)
  }

  @observable.ref private lastPress: number = 0

  @action
  private updateLastPress(lastPress: number) {
    this.lastPress = lastPress
  }

  @boundMethod
  private onPress() {
    const delta = new Date().getTime() - this.lastPress
    const delay = this.props.delay || 200
    const isDoubleClick = delta < delay
    if (isDoubleClick) {
      this.props.onDoubleClick()
    } else {
      this.props.onPress && this.props.onPress()
      this.updateLastPress(new Date().getTime())
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={this.props.style}
        onPress={this.onPress}
      >
        {this.props.children}
      </TouchableWithoutFeedback>
    )
  }
}

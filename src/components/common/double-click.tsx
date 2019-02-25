
import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { boundMethod } from 'autobind-decorator'

interface IDoubleClickProps {
  onDoubleClick(): void
  onPress?(): void
  style?: any
  delay?: number
}

@observer export class DoubleClick extends Component<IDoubleClickProps> {

  constructor(props: IDoubleClickProps) {
    super(props)
  }

  @observable.ref lastPress: number = 0

  @action updateLastPress(lastPress: number) {
    this.lastPress = lastPress
  }

  @boundMethod onPress() {
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
      >{this.props.children}</TouchableWithoutFeedback>
    )
  }
}

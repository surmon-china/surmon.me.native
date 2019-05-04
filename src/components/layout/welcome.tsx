/**
 * Common welcome
 * @file 全局公共启动页 TODO: 暂时还没用得上
 * @module app/components/layout/welcome
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { View, Image, StyleSheet, StatusBar } from 'react-native'
import { observable } from 'mobx'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'

export class Welcome extends Component {

  componentWillMount() {
    setTimeout (() => {
      console.log('跳转到启动页面啦', /* this.props.navigator */)
    }, 1666);
  }

  render () {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#rgba(0, 0, 0, 0)'}
          barStyle="light-content"
          showHideTransition='slide'
          translucent={true}
          hidden={false}
        />
        <Image
          style={styles.launchImage}
          source={require('@app/images/android-launch/launch-image.png')}
        />
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
      },
      launchImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: sizes.screen.width,
        height: sizes.screen.height
      }
    })
  }
})


import React, { Component } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { Alert, Button, ListView, StyleSheet, Text, View } from 'react-native'
import { IPageProps } from '@app/types/props'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'

interface IProps extends IPageProps {}

@observer export class ArticleSearch extends Component<IProps> {

  static navigationOptions = {
    header: null
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <Text>关键词推荐及搜索历史，顶部是一个搜索框</Text>
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
      }
    })
  }
})

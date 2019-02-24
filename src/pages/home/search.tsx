
import React, { Component } from 'react';
import { NavigationContainerProps, NavigationScreenConfigProps } from "react-navigation"
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { Alert, BackHandler, Button, ListView, Platform, StyleSheet, Text, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'

import colors from '@app/style/colors';
import * as sizes from '@app/style/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.background,
    paddingTop: sizes.navbarHeight + sizes.statusBarHeight,
    marginBottom: Platform.OS == 'ios' ? sizes.navbarHeight : 0
  }
})

interface IProps extends NavigationContainerProps {}

@observer export class ArticleSearch extends Component<IProps> {

  static navigationOptions = {
    title: 'Search',
    header: null,
    // headerMode: 'screen',
    tabBarVisible: false
    // tabBar: () => ({ visible: false, label: "test" })
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>关键词推荐及搜索历史，顶部是一个搜索框</Text>
      </View>
    )
  }
}

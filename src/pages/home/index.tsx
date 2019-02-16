import React, { Component } from 'react';
import { NavigationContainerProps } from "react-navigation"
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { Alert, BackHandler, ListView, Platform, StyleSheet, Text, View } from 'react-native';
import ArticleList from '@app/components/article/article-list';
import colors from '@app/style/colors';
import * as sizes from '@app/style/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingTop: sizes.navbarHeight + sizes.statusBarHeight,
    marginBottom: Platform.OS == 'ios' ? sizes.navbarHeight : 0
  }
})

interface IProps extends NavigationContainerProps {}

@observer export class Home extends Component<IProps> {

  static navigationOptions = {
    title: 'Home',
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>header 左边是标签分类筛选器 右边是搜索框按钮</Text>
        <Text>文章幻灯</Text>
        <Text>文章列表</Text>
        <Text>文章列表</Text>
      </View>
    )
  }
}

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

// 文章数据
export interface IArticle {
  id?: number
  _id?: TArticleId
  title: string
  description: string
  content?: string
  keywords: string[]
  meta?: {
    likes: number
    views: number
    comments: number
  }
  origin: EOriginState
  public: EPublicState
  state: EPublishState
  update_at?: string
  create_at?: string
  tag: ITag[]
  category: ICategory[]
  extends: IDataExtends[]
}

interface IProps extends NavigationContainerProps {}

@observer export class Articles extends Component<IProps> {

  static navigationOptions = {
    title: 'Home',
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>单个文章</Text>
      </View>
    )
  }
}

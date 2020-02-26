/**
 * Index
 * @file 主页（文章列表）
 * @module pages/home/index
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component, RefObject } from 'react'
import { StyleSheet, View } from 'react-native'
import { boundMethod } from 'autobind-decorator'
import { observable } from 'mobx'
import { Observer, observer } from 'mobx-react'
import { Remind } from '@app/components/common/remind'
import { Iconfont } from '@app/components/common/iconfont'
import { TouchableView } from '@app/components/common/touchable-view'
import { CustomHeaderTitle } from '@app/components/layout/title'
import { archiveFilterStore, ArchiveFilter } from '@app/components/archive/filter'
import { ArticleList } from '@app/components/archive/list'
import { IPageProps, NavigationProps } from '@app/types/props'
import { HomeRoutes } from '@app/constants/routes'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { getHeaderButtonStyle } from '@app/style/mixins'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'

class IndexStore {
  articleListElement: RefObject<ArticleList> = React.createRef()

  @boundMethod scrollToArticleListTop() {
    const element = this.articleListElement.current
    element && element.scrollToListTop()
  }
}
export const indexStore = new IndexStore()
export interface IIndexProps extends IPageProps {}

@observer export class Home extends Component<IIndexProps> {

  static getPageScreenOptions = ({ navigation }: NavigationProps) => {
    const { styles } = obStyles

    return {
      headerTitle: () => (
        <CustomHeaderTitle
          i18nKey={LANGUAGE_KEYS.HOME}
          onDoubleClick={indexStore.scrollToArticleListTop}
        />
      ),
      headerLeft: () => <Observer render={() => (
        <TouchableView
          accessibilityLabel="文章筛选器"
          accessibilityHint="切换文章筛选器"
          onPress={() => archiveFilterStore.updateVisibleState(true)}
        >
          <Iconfont
            name="list"
            color={colors.cardBackground}
            {...getHeaderButtonStyle()}
          />
          {archiveFilterStore.isActiveTagOrCategoryFilter && (
            <Remind style={styles.headerCheckedIcon} />
          )}
        </TouchableView>
      )}/>,
      headerRight: () => <Observer render={() => (
        <TouchableView
          accessibilityLabel="搜索按钮"
          accessibilityHint="打开搜索页面"
          onPress={() => navigation.push(HomeRoutes.ArticleSearch)}
        >
          <Iconfont
            name="search"
            color={colors.cardBackground}
            {...getHeaderButtonStyle(18)}
          />
        </TouchableView>
      )}/>
    }
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <ArchiveFilter />
        <ArticleList
          route={this.props.route}
          navigation={this.props.navigation}
          ref={indexStore.articleListElement}
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
      headerCheckedIcon: {
        position: 'absolute',
        right: sizes.gap - 4,
        bottom: -1
      }
    })
  }
})

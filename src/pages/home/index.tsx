/**
 * Index
 * @file 主页（文章列表）
 * @module pages/home/index
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component, RefObject } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'
import { observable } from 'mobx'
import { Observer } from 'mobx-react'
import { observer } from 'mobx-react/native'
import { boundMethod } from 'autobind-decorator'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Remind } from '@app/components/common/remind'
import { TouchableView } from '@app/components/common/touchable-view'
import { CustomHeader } from '@app/components/layout/header'
import { archiveFilterStore, ArchiveFilter } from '@app/components/archive/filter'
import { ArticleList } from '@app/components/archive/list'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { IPageProps } from '@app/types/props'
import { EHomeRoutes } from '@app/routes'
import { getHeaderButtonStyle } from '@app/style/mixins'
import colors from '@app/style/colors'
import i18n from '@app/services/i18n'
import sizes from '@app/style/sizes'

// 首页 Store
class IndexStore {

  articleListElement: RefObject<ArticleList> = React.createRef()

  @boundMethod
  scrollToArticleListTop() {
    const element = this.articleListElement.current
    element && element.scrollToListTop()
  }
}

export const indexStore = new IndexStore()
export interface IIndexProps extends IPageProps {}

@observer
export class Home extends Component<IIndexProps> {

  constructor(props: IIndexProps) {
    super(props)
  }

  static navigationOptions = (config: NavigationScreenConfigProps) => {
    const { styles } = obStyles
    const buttonStyle = {
      ...getHeaderButtonStyle(21),
      color: colors.cardBackground
    }

    return {
      headerTitle: (
        <CustomHeader
          title={i18n.t(LANGUAGE_KEYS.HOME)}
          onDoubleClick={indexStore.scrollToArticleListTop}
        />
      ),
      headerLeft: (
        <TouchableView onPress={() => archiveFilterStore.updateVisibleState(true)}>
          <Ionicon name="ios-options" {...buttonStyle} />
          <Observer
            render={() => archiveFilterStore.isActiveTagOrCategoryFilter && (
              <Remind style={styles.headerCheckedIcon} />
            )}
          />
        </TouchableView>
      ),
      headerRight: (
        <TouchableView onPress={() => config.navigation.push(EHomeRoutes.ArticleSearch)}>
          <Ionicon name="ios-search" {...buttonStyle} />
        </TouchableView>
      )
    }
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <ArchiveFilter />
        <ArticleList
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

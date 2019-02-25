
import React, { Component } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { NavigationContainerProps, NavigationScreenConfigProps } from 'react-navigation'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { boundMethod } from 'autobind-decorator'
import { observer } from 'mobx-react/native'
import { observable } from 'mobx'
import { archiveFilterStore, ArchiveFilter } from '@app/components/archive/filter'
import { ArticleList } from '@app/components/archive/list'
import { CustomHeader } from '@app/components/layouts/header'
import { Remind } from '@app/components/common/remind'
import { EHomeRoutes } from '@app/routes'
import colors from '@app/style/colors'
import i18n from '@app/services/i18n'
import * as sizes from '@app/style/sizes'
import * as LANGUAGE from '@app/constants/language'

class IndexStore {

  articleListRef: any = null
  
  @boundMethod updateArticleListRef(ref: any) {
    this.articleListRef = ref
  }

  @boundMethod scroolToArticleListTop() {
    this.articleListRef.scrollToIndex({ index: 0, viewOffset: 0 })
  }
}

export const indexStore = new IndexStore()

interface IProps extends NavigationContainerProps {}

@observer export class Home extends Component<IProps> {

  static navigationOptions = (config: NavigationScreenConfigProps) => {
    const { styles } = obStyles
    const buttonStyle = {
      size: 20,
      color: colors.cardBackground,
      style: styles.headerButton
    }
    return {
      headerTitle: (
        <CustomHeader
          onDoubleClick={indexStore.scroolToArticleListTop}
          title={i18n.t(LANGUAGE.HOME)}
        />
      ),
      headerLeft: (
        <TouchableOpacity
          activeOpacity={sizes.touchOpacity}
          onPress={archiveFilterStore.toggleVisibleState}
        >
          <Ionicon {...buttonStyle} name="ios-list" />
          {archiveFilterStore.activeFilter && (
            <Remind style={styles.headerCheckedIcon} />
          )}
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          activeOpacity={sizes.touchOpacity}
          onPress={() => config.navigation.push(EHomeRoutes.ArticleSearch)}
        >
          <Ionicon {...buttonStyle} name="ios-search" />
        </TouchableOpacity>
      )
    }
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        {archiveFilterStore.isVisible && (
          <View style={styles.archiveFilterView}>
            <ArchiveFilter />
          </View>
        )}
        <ArticleList getListRef={indexStore.updateArticleListRef} />
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
      headerButton: {
        paddingHorizontal: sizes.gap
      },
      headerCheckedIcon: {
        position: 'absolute',
        right: sizes.gap - 4,
        bottom: 2,
      },
      archiveFilterView: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }
    })
  }
})

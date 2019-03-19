
import React, { Component } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationScreenConfigProps } from 'react-navigation'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { boundMethod } from 'autobind-decorator'
import { observer } from 'mobx-react/native'
import { observable } from 'mobx'
import { archiveFilterStore, ArchiveFilter } from '@app/components/archive/filter'
import { ArticleList } from '@app/components/archive/list'
import { CustomHeader } from '@app/components/layouts/header'
import { Remind } from '@app/components/common/remind'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { IPageProps } from '@app/types/props'
import { EHomeRoutes } from '@app/routes'
import { getHeaderButtonStyle } from '@app/style/mixins'
import colors from '@app/style/colors'
import i18n from '@app/services/i18n'
import sizes from '@app/style/sizes'

class IndexStore {

  articleListRef: any = null
  
  @boundMethod updateArticleListRef(ref: any) {
    this.articleListRef = ref
  }

  @boundMethod scrollToArticleListTop() {
    this.articleListRef.scrollToIndex({ index: 0, viewOffset: 0 })
  }
}

export const indexStore = new IndexStore()

interface IProps extends IPageProps {}

@observer export class Home extends Component<IProps> {

  static navigationOptions = (config: NavigationScreenConfigProps) => {
    const { styles } = obStyles
    const buttonStyle = {
      ...getHeaderButtonStyle(21),
      color: colors.cardBackground
    }
    return {
      headerTitle: (
        <CustomHeader
          onDoubleClick={indexStore.scrollToArticleListTop}
          title={i18n.t(LANGUAGE_KEYS.HOME)}
        />
      ),
      headerLeft: (
        <TouchableOpacity
          activeOpacity={sizes.touchOpacity}
          onPress={archiveFilterStore.toggleVisibleState}
        >
          <FontAwesome name="sliders" {...buttonStyle} />
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
          <Ionicon name="ios-search" {...buttonStyle} />
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
        <ArticleList
          navigation={this.props.navigation}
          getListRef={indexStore.updateArticleListRef}
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
        bottom: -1,
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

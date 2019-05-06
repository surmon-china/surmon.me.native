/**
 * App article archive header component
 * @file 文章列表头部过滤信息组件
 * @module app/components/archive/header
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { optionStore } from '@app/stores/option'
import { Text } from '@app/components/common/text'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { ICategory, ITag } from '@app/types/business'
import { TouchableView } from '@app/components/common/touchable-view'
import { archiveFilterStore, EFilterType } from './filter'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import mixins, { getHeaderButtonStyle } from '@app/style/mixins'

export interface IArchiveProps {}
export const ArticleArchiveHeader = observer((props: IArchiveProps): JSX.Element | null => {

  const { styles } = obStyles
  const { filterActive: isFilterActive, filterType, filterValue, filterTypeText } = archiveFilterStore

  if (!isFilterActive) {
    return null
  }

  const filterValueText = (
    filterType === EFilterType.Search
      ? filterValue as string
      : optionStore.isEnLang
        ? (filterValue as ICategory | ITag).slug
        : (filterValue as ICategory | ITag).name
  )

  return (
    <View style={styles.container}>
      <View style={mixins.rowCenter}>
        <Text>{filterTypeText}</Text>
        <Text> "{filterValueText}" </Text>
        <Text>{i18n.t(LANGUAGE_KEYS.FILTER_RESULT)}</Text>
      </View>
      <View style={styles.resetButton}>
        <TouchableView
          accessibilityLabel="清空所有文章过滤条件"
          onPress={archiveFilterStore.clearActiveFilter}
        >
          <Ionicon
            name="ios-close"
            color={colors.textLink}
            {...getHeaderButtonStyle()}
          />
        </TouchableView>
      </View>
    </View>
  )
})

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        ...mixins.rowCenter,
        justifyContent: 'center',
        height: sizes.goldenRatioGap * 4,
        borderBottomWidth: sizes.borderWidth,
        borderBottomColor: colors.border,
        backgroundColor: colors.cardBackground
      },
      resetButton: {
        position: 'absolute',
        right: 10
      }
    })
  }
})

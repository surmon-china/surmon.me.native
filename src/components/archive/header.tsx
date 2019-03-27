
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react/native'
import { observable, action, computed } from 'mobx'
import { NavigationContainerProps } from 'react-navigation'
import { archiveFilterStore, filterTypeTextMap, EFilterType } from '@app/components/archive/filter'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'
import mixins, { getHeaderButtonStyle } from '@app/style/mixins'

interface IProps extends NavigationContainerProps {}

export const ArticleListHeader = observer((props: IProps): JSX.Element | null => {
  const { styles } = obStyles
  const { filterValueText, activeType } = archiveFilterStore

  // 这里应该是一个 transform 动画
  if (!filterValueText || !activeType) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={mixins.rowCenter}>
        <Text>{filterTypeTextMap[activeType]}</Text>
        <Text> “{archiveFilterStore.filterValueText}” </Text>
        <Text>的过滤结果</Text>
      </View>
      <View style={styles.resetButton}>
        <TouchableOpacity onPress={archiveFilterStore.clearActiveFilter}>
          <Ionicon name="ios-close" {...getHeaderButtonStyle()} />
        </TouchableOpacity>
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
        height: sizes.gapGoldenRatio * 4,
        borderBottomWidth: sizes.borderWidth,
        borderBottomColor: colors.border,
        backgroundColor: colors.cardBackground
      },
      resetButton: {
        position: 'absolute',
        right: 10,
      }
    })
  }
})

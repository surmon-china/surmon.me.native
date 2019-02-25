
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { observer } from 'mobx-react/native'
import { observable, action, computed } from 'mobx'
import { NavigationContainerProps } from 'react-navigation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '@app/style/colors'
import * as sizes from '@app/style/sizes'
import * as fonts from '@app/style/fonts'

interface IProps extends NavigationContainerProps {}

export const ArticleListHeader = observer((props: IProps): JSX.Element => {
  const { styles } = obStyles
  return (
    <View style={styles.container}>
      <Text>啥也没有啊</Text>
    </View>
  )
})

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        height: 66,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: sizes.borderWidth,
        borderBottomColor: colors.textPrimary,
        backgroundColor: colors.cardBackground
      }
    })
  }
})

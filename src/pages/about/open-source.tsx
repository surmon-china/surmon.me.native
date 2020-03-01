/**
 * OpenSource
 * @file OpenSource
 * @module pages/about/open-source
 * @author Surmon <https://github.com/surmon-china>
 */

import * as Sentry from '@sentry/react-native'
import React, { PureComponent } from 'react'
import { StyleSheet, SafeAreaView, Text, Linking, ScrollView } from 'react-native'
import { observable } from 'mobx'
import { projectUrl, license, dependencies } from '@app/config'
import { IPageProps } from '@app/types/props'
import { TouchableView } from '@app/components/common/touchable-view'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

export interface IOpenSourceProps extends IPageProps {}
export class OpenSource extends PureComponent<IOpenSourceProps> {
  render() {
    const { styles } = obStyles
    return (
      <SafeAreaView style={styles.fullView}>
        <ScrollView style={[styles.fullView, styles.container]}>
          <Text style={styles.title}>GitHub repository</Text>
          <Text
            style={[styles.item, styles.link]}
            onPress={() => Linking.openURL(projectUrl)}
          >
            {projectUrl}
          </Text>
          <Text style={styles.title}>License</Text>
          <Text style={styles.item}>{license}</Text>
          <Text style={styles.title}>Dependencies</Text>
          {Object.keys(dependencies).map(dependencie => (
            <Text key={dependencie} style={styles.item}>∙ {dependencie}</Text>
          ))}
          <TouchableView
            style={styles.errorTest}
            onPress={Sentry.nativeCrash}
          >
            <Text style={{ color: colors.red }}>Error test!</Text>
          </TouchableView>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      fullView: {
        flex: 1,
      },
      container: {
        padding: sizes.gap
      },
      title: {
        ...fonts.h3,
        color: colors.primary,
        marginBottom: sizes.goldenRatioGap
      },
      item: {
        color: colors.textDefault,
        marginBottom: sizes.goldenRatioGap
      },
      link: {
        color: colors.textLink,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
      },
      errorTest: {
        marginTop: sizes.goldenRatioGap,
        marginBottom: sizes.gap,
      }
    })
  }
})

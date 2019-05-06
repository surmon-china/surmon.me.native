/**
 * App article item component
 * @file 文章列表子组件
 * @module app/components/archive/item
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { PureComponent } from 'react'
import { Image, StyleSheet, TextStyle, View, ImageSourcePropType } from 'react-native'
import { observable, computed } from 'mobx'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TouchableView } from '@app/components/common/touchable-view'
import { Text } from '@app/components/common/text'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { IArticle } from '@app/types/business'
import { EOriginState } from '@app/types/state'
import i18n, { TLanguage } from '@app/services/i18n'
import { dateToYMD } from '@app/utils/filters'
import { staticApi } from '@app/config'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

export interface IArtileListItemProps {
  article: IArticle
  liked: boolean
  onPress(article: IArticle): void
  darkTheme: boolean
  language: TLanguage
}

export class ArticleListItem extends PureComponent<IArtileListItemProps> {

  // 文章来源文案
  @computed
  private get originTexts() {
    return {
      [EOriginState.Hybrid]: i18n.t(LANGUAGE_KEYS.ORIGIN_HYBRID),
      [EOriginState.Original]: i18n.t(LANGUAGE_KEYS.ORIGIN_ORIGINAL),
      [EOriginState.Reprint]: i18n.t(LANGUAGE_KEYS.ORIGIN_REPRINT)
    }
  }

  // 文章来源样式
  private getOriginBackgroundStyle(origin: EOriginState): TextStyle {
    const bgColors = {
      [EOriginState.Hybrid]: colors.primary, 
      [EOriginState.Original]: colors.accent,
      [EOriginState.Reprint]: colors.red
    }
    return {
      backgroundColor: bgColors[origin]
    }
  }

  // 缩略图
  private getThumbSource(thumb: string): ImageSourcePropType {
    return { uri: thumb || `${staticApi}/images/thumb-carrousel.jpg` }
  }
  
  render() {
    const { article } = this.props
    const { styles } = obStyles

    return (
      <TouchableView
        onPress={() => this.props.onPress(article)}
        style={styles.container}
      >
        <Image
          source={this.getThumbSource(article.thumb)}
          style={styles.thumb}
        />
        <Text
          style={[
            styles.origin,
            this.getOriginBackgroundStyle(article.origin)
          ]}
          numberOfLines={1}
        >
          {this.originTexts[article.origin]}
        </Text>
        <Text style={styles.title} numberOfLines={1}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{article.description}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicon name="ios-time" style={styles.metaIcon} />
            <Text style={styles.metaText}>{dateToYMD(article.create_at)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicon name="ios-eye" style={styles.metaIcon} />
            <Text style={styles.metaText}>{article.meta.views}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicon name="ios-chatboxes" style={styles.metaIcon} />
            <Text style={styles.metaText}>{article.meta.comments}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicon
              name="ios-heart"
              style={[
                styles.metaIcon,
                this.props.liked ? { color: colors.red } : null
              ]}
            />
            <Text style={styles.metaText}>{article.meta.likes}</Text>
          </View>
        </View>
      </TouchableView>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        marginTop: sizes.gap,
        marginHorizontal: sizes.goldenRatioGap,
        backgroundColor: colors.cardBackground
      },
      thumb: {
        flex: 1,
        height: 110,
        maxWidth: '100%',
        resizeMode: 'cover',
        backgroundColor: colors.textSecondary
      },
      origin: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 28,
        lineHeight: 26,
        paddingHorizontal: 8,
        opacity: 0.6,
        color: colors.textTitle,
        textTransform: 'capitalize'
      },
      title: {
        ...fonts.h4,
        fontWeight: '700',
        margin: sizes.goldenRatioGap
      },
      description: {
        ...fonts.base,
        margin: sizes.goldenRatioGap,
        marginTop: - sizes.goldenRatioGap / 4,
        color: colors.textSecondary
      },
      meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: colors.textMuted,
        borderTopWidth: sizes.borderWidth * 2,
        paddingHorizontal: sizes.goldenRatioGap,
        paddingVertical: sizes.gap / 2 
      },
      metaItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      metaIcon: {
        ...fonts.base,
        marginTop: 1,
        marginRight: sizes.goldenRatioGap / 2,
        color: colors.textSecondary
      },
      metaText: {
        ...fonts.small,
        color: colors.textSecondary
      }
    })
  }
})

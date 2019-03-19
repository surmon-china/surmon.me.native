
import React, { PureComponent } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { observable, computed } from 'mobx'
import { Image, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native'
import { Text } from '@app/components/common/text'
import { toYMD, buildThumb } from '@app/utils/filters'
import { IArticle } from '@app/types/business'
import { EOriginState } from '@app/types/state'
import { LANGUAGE_KEYS } from '@app/constants/language'
import i18n, { TLanguage } from '@app/services/i18n'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

export interface IArtileListItemProps {
  article: IArticle
  liked: boolean
  darkTheme: boolean
  language: TLanguage
  onPress(article: IArticle): void
}

export class ArticleListItem extends PureComponent<IArtileListItemProps> {

  @computed get originTexts() {
    return {
      [EOriginState.Hybrid]: i18n.t(LANGUAGE_KEYS.ORIGIN_HYBRID),
      [EOriginState.Original]: i18n.t(LANGUAGE_KEYS.ORIGIN_ORIGINAL),
      [EOriginState.Reprint]: i18n.t(LANGUAGE_KEYS.ORIGIN_REPRINT)
    }
  }

  private getOriginStyle(origin: EOriginState): TextStyle {
    const bgColors = {
      [EOriginState.Hybrid]: colors.primary, 
      [EOriginState.Original]: colors.accent,
      [EOriginState.Reprint]: colors.red
    }
    return {
      ...obStyles.styles.origin,
      backgroundColor: bgColors[origin]
    }
  }
  
  render() {
    const { props, originTexts, getOriginStyle } = this
    const { article, liked, onPress } = props
    const { styles } = obStyles
    return (
      <TouchableOpacity
        activeOpacity={sizes.touchOpacity}
        style={styles.container}
        onPress={() => onPress(article)}
      >
        <Image source={buildThumb(article.thumb)} style={styles.thumb} />
        <Text style={getOriginStyle(article.origin)} numberOfLines={1}>{originTexts[article.origin]}</Text>
        <Text style={styles.title} numberOfLines={1}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{article.description}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="ios-time" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ toYMD(article.create_at) }</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="ios-eye" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ article.meta.views }</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="ios-chatboxes" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ article.meta.comments }</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="ios-heart" style={[styles.metaIcon, liked ? { color: colors.red } : null]}/>
            <Text style={styles.metaText}>{article.meta.likes}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        marginHorizontal: sizes.gapGoldenRatio,
        marginTop: sizes.gapGoldenRatio,
        backgroundColor: colors.cardBackground
      },
      thumb: {
        flex: 1,
        height: 130,
        maxWidth: '100%',
        resizeMode: 'cover'
      },
      origin: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 28,
        lineHeight: 26,
        paddingHorizontal: 8,
        opacity: 0.5,
        textTransform: 'capitalize',
      },
      title: {
        ...fonts.h4,
        fontWeight: '700',
        margin: sizes.gapGoldenRatio
      },
      description: {
        ...fonts.base,
        margin: sizes.gapGoldenRatio,
        marginTop: - sizes.gapGoldenRatio / 4,
        color: colors.textSecondary
      },
      meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: colors.textMuted,
        borderTopWidth: sizes.borderWidth * 2,
        paddingHorizontal: sizes.gapGoldenRatio,
        paddingVertical: sizes.gap / 2 
      },
      metaItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      metaIcon: {
        ...fonts.base,
        marginRight: sizes.gapGoldenRatio / 2,
        color: colors.textSecondary
      },
      metaText: {
        ...fonts.small,
        color: colors.textSecondary
      }
    })
  }
})

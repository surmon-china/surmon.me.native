
import React, { PureComponent } from 'react'
import { observable, computed } from 'mobx'
import { Image, StyleSheet, TextStyle, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { toYMD, buildThumb } from '@app/utils/filters'
import { IArticle } from '@app/types/business'
import { EOriginState } from '@app/types/state'
import i18n, { TLanguage } from '@app/services/i18n'
import colors from '@app/style/colors'
import * as sizes from '@app/style/sizes'
import * as fonts from '@app/style/fonts'
import * as LANGUAGE from '@app/constants/language'

export interface IArtileListItem {
  article: IArticle
  liked: boolean
  darkTheme: boolean
  language: TLanguage
  onPress(aricleId: number): void
}

export class ArticleListItem extends PureComponent<IArtileListItem> {

  @computed get originTexts() {
    return {
      [EOriginState.Hybrid]: i18n.t(LANGUAGE.ORIGIN_HYBRID),
      [EOriginState.Original]: i18n.t(LANGUAGE.ORIGIN_ORIGINAL),
      [EOriginState.Reprint]: i18n.t(LANGUAGE.ORIGIN_REPRINT)
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
        onPress={() => onPress(article.id)}
      >
        <Image source={buildThumb(article.thumb)} style={styles.thumb} />
        <Text style={getOriginStyle(article.origin)} numberOfLines={1}>{originTexts[article.origin]}</Text>
        <Text style={styles.title} numberOfLines={1}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{article.description}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="clock" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ toYMD(article.create_at) }</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="eye" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ article.meta.views }</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="comment-processing" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ article.meta.comments }</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="favorite" style={[styles.metaIcon, {
              color: liked ? colors.red : colors.textDefault
            }]}/>
            <Text style={styles.metaText}>{article.meta.likes}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const listItemGap = sizes.gap * 0.66
const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        marginHorizontal: listItemGap,
        marginTop: listItemGap,
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
        fontFamily: fonts.fontFamily
      },
      title: {
        ...fonts.h4,
        fontWeight: '500',
        margin: listItemGap,
        color: colors.textTitle
      },
      description: {
        ...fonts.base,
        textAlign: 'left',
        margin: listItemGap,
        marginTop: - listItemGap / 4,
        color: colors.textDefault
      },
      meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: colors.textPrimary,
        borderTopWidth: sizes.borderWidth * 2,
        paddingHorizontal: listItemGap,
        paddingVertical: sizes.gap / 2 
      },
      metaItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      metaIcon: {
        ...fonts.base,
        marginRight: listItemGap / 2,
        color: colors.textDefault
      },
      metaText: {
        ...fonts.small,
        color: colors.textDefault
      }
    })
  }
})

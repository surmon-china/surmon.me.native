
import React, { PureComponent } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { observable, computed } from 'mobx'
import { Image, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native'
import { Text } from '@app/components/common/text'
import { IComment } from '@app/types/business'
import { EOriginState } from '@app/types/state'
import { LANGUAGE_KEYS } from '@app/constants/language'
import i18n, { TLanguage } from '@app/services/i18n'
import { getUrlByEmail } from '@app/services/gravatar'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

export interface IArtileListItemProps {
  comment: IComment
  liked: boolean
  darkTheme: boolean
  language: TLanguage
  onPress(article: IComment): void
}

export class CommentItem extends PureComponent<IArtileListItemProps> {
  
  render() {
    const { props } = this
    const { comment, liked, onPress } = props
    const { styles } = obStyles
    return (
      <TouchableOpacity
        activeOpacity={sizes.touchOpacity}
        style={styles.container}
        onPress={() => onPress(comment)}
      >
        <Image source={{ uri: getUrlByEmail(comment.author.email) }} style={styles.thumb} />
        <View>

        </View>
        <Text style={styles.title} numberOfLines={1}>{comment.content}</Text>
        {/* <Text style={styles.title} numberOfLines={1}>{comment.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{comment.description}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicon name="ios-time" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ toYMD(comment.create_at) }</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicon name="ios-eye" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ comment.meta.views }</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicon name="ios-chatboxes" style={styles.metaIcon} />
            <Text style={styles.metaText}>{ comment.meta.comments }</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicon name="ios-heart" style={[styles.metaIcon, liked ? { color: colors.red } : null]}/>
            <Text style={styles.metaText}>{comment.meta.likes}</Text>
          </View>
        </View> */}
      </TouchableOpacity>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        // marginHorizontal: sizes.goldenRatioGap,
        marginTop: sizes.goldenRatioGap,
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

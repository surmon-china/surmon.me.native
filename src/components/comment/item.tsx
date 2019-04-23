
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
import { toYMD, buildThumb } from '@app/utils/filters'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'
import mixins from '@app/style/mixins';

export interface IArtileListItemProps {
  comment: IComment
  liked: boolean
  darkTheme: boolean
  language: TLanguage
  onLike(comment: IComment): void
  onReply(comment: IComment): void
}

export class CommentItem extends PureComponent<IArtileListItemProps> {
  
  render() {
    const { props } = this
    const { comment, liked } = props
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: getUrlByEmail(comment.author.email) }}
          style={styles.gravatar}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.userName} numberOfLines={1}>{comment.author.name}</Text>
            <Text style={styles.storey} numberOfLines={1}>#{comment.id}</Text>
          </View>
          {!!comment.pid && (
            <Text style={styles.reply}>回复：#{comment.pid}</Text>
          )}
          <Text style={styles.commentContent}>{comment.content}</Text>
          <View style={styles.footer}>
            <View style={styles.footerInfo}>
              {comment.ip_location && (
                <>
                  <Text style={styles.footerInfoItem} numberOfLines={1}>{comment.ip_location.city}</Text>
                  <Text style={styles.footerInfoItem}>  ∙  </Text>
                </>
              )}
              <Text style={styles.footerInfoItem} numberOfLines={1}>{toYMD(comment.create_at)}</Text>
            </View>
            <View style={styles.footerActions}>
              <TouchableOpacity
                activeOpacity={sizes.touchOpacity}
                onPress={() => this.props.onReply(comment)}
              >
                <Ionicon name="ios-redo" size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={sizes.touchOpacity}
                onPress={() => this.props.onLike(comment)}
              >
                <Ionicon name="ios-thumbs-up" size={18} style={{ color: colors.red }}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        padding: sizes.goldenRatioGap,
        borderColor: colors.border,
        borderBottomWidth: sizes.borderWidth
      },
      gravatar: {
        width: 36,
        height: 36,
        resizeMode: 'cover'
      },
      content: {
        flex: 1,
        marginLeft: sizes.goldenRatioGap,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      userName: {
        ...fonts.h4,
        fontWeight: '900'
      },
      storey: {
        color: colors.textSecondary
      },
      reply: {
        marginBottom: 5,
      },
      commentContent: {
        lineHeight: 24,
        fontWeight: 'normal'
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
      },
      footerInfo: {
        flexDirection: 'row',
      },
      footerInfoItem: {
        color: colors.textSecondary,
        ...fonts.small
      },
      footerActions: {
        ...mixins.rowCenter
      }
      // origin: {
      //   position: 'absolute',
      //   top: 0,
      //   right: 0,
      //   height: 28,
      //   lineHeight: 26,
      //   paddingHorizontal: 8,
      //   opacity: 0.5,
      //   textTransform: 'capitalize',
      // },
      // title: {
      //   ...fonts.h4,
      //   fontWeight: '700',
      //   margin: sizes.goldenRatioGap
      // },
      // description: {
      //   ...fonts.base,
      //   margin: sizes.goldenRatioGap,
      //   marginTop: - sizes.goldenRatioGap / 4,
      //   color: colors.textSecondary
      // },
      // meta: {
      //   flexDirection: 'row',
      //   justifyContent: 'space-between',
      //   alignItems: 'center',
      //   borderTopColor: colors.textMuted,
      //   borderTopWidth: sizes.borderWidth * 2,
      //   paddingHorizontal: sizes.goldenRatioGap,
      //   paddingVertical: sizes.gap / 2 
      // },
      // metaItem: {
      //   flexDirection: 'row',
      //   justifyContent: 'center',
      //   alignItems: 'center'
      // },
      // metaIcon: {
      //   ...fonts.base,
      //   marginTop: 1,
      //   marginRight: sizes.goldenRatioGap / 2,
      //   color: colors.textSecondary
      // },
      // metaText: {
      //   ...fonts.small,
      //   color: colors.textSecondary
      // }
    })
  }
})

/**
 * Guestbook
 * @file 留言板页面
 * @module pages/guestbook
 * @author Surmon <https://github.com/surmon-china>
 */

 import React, { Component, RefObject } from 'react'
import { StyleSheet, View, ImageBackground, Animated, TouchableWithoutFeedback, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react/native'
import { boundMethod } from 'autobind-decorator'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { likeStore } from '@app/stores/like'
import { staticApi } from '@app/config'
import { IPageProps } from '@app/types/props'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { TouchableView } from '@app/components/common/touchable-view'
import { Text } from '@app/components/common/text'
import { Comment } from '@app/components/comment'
import { CustomHeader } from '@app/components/layout/header'
import fetch from '@app/services/fetch'
import colors from '@app/style/colors'
import i18n from '@app/services/i18n'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

const defaultLikeButtonOpacity = 0.6

class GuestbookStore {

  commentElement: RefObject<Comment> = React.createRef()

  @boundMethod
  scrollToCommentListTop() {
    const element = this.commentElement.current
    element && element.scrollToListTop()
  }

  @observable likeButtonOpacity: Animated.Value = new Animated.Value(defaultLikeButtonOpacity)
  @observable bannerHeight: Animated.Value = new Animated.Value(sizes.screen.width / 2)

  @computed
  get isLiked(): boolean {
    return likeStore.articles.includes(0)
  }

  private startBackgroundAnimate(collapse: boolean) {
    Animated.parallel([
      Animated.timing(this.likeButtonOpacity, {
        toValue: collapse ? 0 : defaultLikeButtonOpacity,
        duration: 66
      }),
      Animated.timing(this.bannerHeight, {
        toValue: sizes.screen.width / (collapse ? 2.6 : 2),
        duration: 166
      })
    ]).start()
  }

  @boundMethod
  handleCommentListScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const listOffsetY = event.nativeEvent.contentOffset.y
    this.startBackgroundAnimate(listOffsetY > 20)
  }

  @boundMethod
  handleLikeSite() {
    if (!this.isLiked) {
      fetch.patch<boolean>('/like/site')
      .then(() => {
        likeStore.likeArticle(0)
      })
      .catch(error => {
        likeStore.likeArticle(0)
        console.warn('Like site error:', error)
      })
    }
  }
}

export const guestbookStore = new GuestbookStore()
export interface IGuestbookProps extends IPageProps {}

@observer
export class Guestbook extends Component<IGuestbookProps> {

  constructor(props: IGuestbookProps) {
    super(props)
  }

  static navigationOptions = (config: NavigationScreenConfigProps) => {
    return {
      headerTitle: (
        <CustomHeader
          title={i18n.t(LANGUAGE_KEYS.GUESTBOOK)}
          onDoubleClick={guestbookStore.scrollToCommentListTop}
        />
      )
    }
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.banner, { height: guestbookStore.bannerHeight }]}
        >
          <TouchableWithoutFeedback
            style={styles.bannerImage}
            onPress={guestbookStore.scrollToCommentListTop}
          >
            <ImageBackground
              blurRadius={0}
              source={{ uri: `${staticApi}/images/guestbook.jpg` }}
              style={styles.bannerImage}
            >
              <Animated.View
                style={[styles.like, { opacity: guestbookStore.likeButtonOpacity }]}
              >
                <TouchableView
                  accessibilityLabel="给网站点赞"
                  onPress={guestbookStore.handleLikeSite}
                >
                  <Ionicon
                    name="ios-heart"
                    size={21}
                    color={guestbookStore.isLiked ? colors.red : colors.textMuted}
                  />
                </TouchableView>
              </Animated.View>
              <View style={styles.slogan}>
                <Text style={styles.sloganText}>
                  {i18n.t(LANGUAGE_KEYS.GUESTBOOK_SLOGAN)}
                </Text>
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </Animated.View>
        <View style={styles.comment}>
          <Comment
            postId={0}
            onScroll={guestbookStore.handleCommentListScroll}
            ref={guestbookStore.commentElement}
          />
        </View>
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background
      },
      banner: {
        marginTop: sizes.borderWidth
      },
      bannerImage: {
        flex: 1,
        backgroundColor: colors.cardBackground
      },
      like: {
        position: 'absolute',
        left: sizes.gap,
        bottom: sizes.goldenRatioGap
      },
      slogan: {
        position: 'absolute',
        right: 0,
        top: 20,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 8,
        borderTopLeftRadius: 0,
        backgroundColor: colors.background,
        opacity: 0.4
      },
      sloganText: {
        ...fonts.small,
        fontWeight: '100'
      },
      comment: {
        flex: 1
      }
    })
  }
})

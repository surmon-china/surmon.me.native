import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { boundMethod } from 'autobind-decorator'
import { observer } from 'mobx-react/native'
import { observable } from 'mobx'
import { Text } from '@app/components/common/text'
import { Comment } from '@app/components/comment'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { IPageProps } from '@app/types/props'
import colors from '@app/style/colors'
import i18n from '@app/services/i18n'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

interface IProps extends IPageProps {}

@observer export class Guestbook extends Component<IProps> {

  static navigationOptions = {
    title: i18n.t(LANGUAGE_KEYS.GUESTBOOK),
  }

  constructor(props: IProps) {
    super(props)
  }

  @observable isBackgroundCollapsed: boolean = false
  @observable backgroundHeight = new Animated.Value(sizes.screen.width / 2)

  private startBackgroundAnimate(collapse: boolean) {
    Animated.timing(this.backgroundHeight, {
      toValue: sizes.screen.width / (collapse ? 2.6 : 2),
      duration: 166
    }).start()
  }

  @boundMethod
  private handleCommentListScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const listOffsetY = event.nativeEvent.contentOffset.y
    this.startBackgroundAnimate(listOffsetY > 20)
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.background, { height: this.backgroundHeight }]}>
          <ImageBackground
            source={{ uri: 'https://cdn.surmon.me/images/guestbook.jpg' }}
            style={styles.imageBackground}
            blurRadius={0}
          >
            <View style={styles.textBackground}>
              <Text style={styles.text}>此心光明，亦复何言</Text>
            </View>
          </ImageBackground>
        </Animated.View>
        <View style={styles.comment}>
          <Comment
            postId={0}
            onScroll={this.handleCommentListScroll}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  background: {
    marginTop: sizes.borderWidth
  },
  imageBackground: {
    flex: 1
  },
  textBackground: {
    position: 'absolute',
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 5,
    right: 0,
    top: 20,
    borderTopLeftRadius: 0,
    backgroundColor: colors.background,
    opacity: 0.4
  },
  icon: {
    position: 'absolute',
    left: -22,
    transform: [{ rotateZ: '180deg'}],
    color: colors.background
  },
  text: {
    ...fonts.small,
    fontWeight: '100'
  },
  comment: {
    flex: 1
  }
})

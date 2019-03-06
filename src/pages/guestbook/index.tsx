
import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { StyleSheet, View, Text } from 'react-native'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { IComment } from '@app/types/business'
import { IPageProps } from '@app/types/props'
import colors from '@app/style/colors'
import i18n from '@app/services/i18n'
import sizes from '@app/style/sizes'

interface IProps extends IPageProps {}

@observer export class Guestbook extends Component<IProps> {

  static navigationOptions = {
    title: i18n.t(LANGUAGE_KEYS.GUESTBOOK),
  };

  @observable private loading: boolean = false
  @observable private page: number = 1
  @observable private total: number = 0
  @observable.ref private comments: IComment[] = []

  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
  webview: {
    flex: 1,
    width: sizes.screen.width,
    height: sizes.screen.height,
  }
})


import React, { Component } from 'react';
import { NavigationContainerProps } from "react-navigation"
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { StyleSheet, View, Text } from 'react-native';
import colors from '@app/style/colors';
import * as sizes from '@app/style/sizes';

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
});

export interface IAuthor {
  name: string
  email: string
  site: string
}

interface IComment {
  post_id: number
  pid: number
  content: string
  agent?: string
  author: IAuthor
  likes: number
  ip?: string
  ip_location?: any
  create_at: Date
  update_at: Date
}

interface IProps extends NavigationContainerProps {}

@observer export class Guestbook extends Component<IProps> {

  static navigationOptions = {
    title: 'Guestbook',
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

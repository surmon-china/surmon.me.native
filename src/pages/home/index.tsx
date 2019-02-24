
import React, { Component } from 'react';
import { NavigationContainerProps, NavigationScreenConfigProps } from "react-navigation"
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { Alert, BackHandler, Button, ListView, Platform, StyleSheet, Text, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { EHomeRoutes } from '@app/index';
import { ArticleList } from '@app/components/archive/list';
import colors from '@app/style/colors';
import i18n from '@app/services/i18n'
import * as sizes from '@app/style/sizes';
import * as LANGUAGE from '@app/constants/language'

interface IProps extends NavigationContainerProps {}

@observer export class Home extends Component<IProps> {

  static navigationOptions = (config: NavigationScreenConfigProps) => {
    return {
      title: i18n.t(LANGUAGE.HOME),
      headerLeft: (
        <Ionicon
          name="ios-list"
          size={20}
          color={colors.cardBackground}
          style={styles.headerFilterBtn}
          onPress={() => {
            console.log('打开筛选遮罩弹窗')
          }}
        />
      ),
      headerRight: (
        <Ionicon
          name="ios-search"
          size={20}
          color={colors.cardBackground}
          style={styles.headerSearchBtn}
          onPress={() => {
            config.navigation.push(EHomeRoutes.ArticleSearch)
          }}
        />
      )
    };
  }

  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>轮播图还是 header 都应该从这里传进去</Text> */}
        <ArticleList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    // backgroundColor: '#000',
    // paddingTop: sizes.navbarHeight + sizes.statusBarHeight,
    // marginBottom: Platform.OS == 'ios' ? sizes.navbarHeight : 0
  },
  headerFilterBtn: {
    marginLeft: sizes.gap
  },
  headerSearchBtn: {
    marginRight: sizes.gap
  }
})

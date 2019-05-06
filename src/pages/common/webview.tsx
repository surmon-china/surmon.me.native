/**
 * WebView
 * @file 公共 WebView 页
 * @module pages/common/webview
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { Clipboard, Linking, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react/native'
import { boundMethod } from 'autobind-decorator'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TouchableView } from '@app/components/common/touchable-view'
import { IPageProps, INavigationProps } from '@app/types/props'
import { LANGUAGE_KEYS } from '@app/constants/language'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import { getHeaderButtonStyle } from '@app/style/mixins'

const ActionSheet = require('react-native-actionsheet').default

class WebviewStore {

  @observable url: string = ''
  @observable title: string | null = null
  @observable isLoading: boolean = false

  public webViewElement: React.Ref<WebView> = React.createRef()
  public actionSheetElement: React.MutableRefObject<any> = React.createRef()

  @action.bound updateUrl(url: string) {
    this.url = url
  }

  @action.bound updateTitle(title: string) {
    this.title = title
  }

  @action.bound updateLoadingState(loading: boolean) {
    this.isLoading = loading
  }
}

export const webViewStore = new WebviewStore()
export interface IWebViewProps extends IPageProps {}
@observer
export class WebViewPage extends Component<IWebViewProps> {

  constructor(props: IWebViewProps) {
    super(props)
    this.initUrl()
  }

  static navigationOptions = ({ navigation }: INavigationProps) => {
    const { params } = navigation.state
    const title = (params && params.title) || '...'
    const buttonStyle = getHeaderButtonStyle()

    return {
      title,
      headerLeft: (
        <TouchableView onPress={() => navigation.goBack()}>
          <Ionicon name="ios-arrow-back" {...buttonStyle} />
        </TouchableView>
      ),
      headerRight: (
        <TouchableView
          onPress={() => {
            const { actionSheetElement: actionSheetRef } = webViewStore
            const actionSheet = actionSheetRef.current
            actionSheet && actionSheet.show()
          }}
        >
          <Ionicon name="ios-more" {...buttonStyle} />
        </TouchableView>
      )
    }
  }

  @computed
  private get actionSheetMenus() {
    return [
      {
        title: i18n.t(LANGUAGE_KEYS.OPEN_BY_BROWER),
        handle: () => Linking
          .openURL(webViewStore.url)
          .catch((error: any) => console.warn('Open url failed:', error))
      },
      {
        title: i18n.t(LANGUAGE_KEYS.COPY_URL),
        handle: () => Clipboard.setString(webViewStore.url)
      }
    ]
  }

  @computed
  private get actionSheetMenuNames() {
    return this.actionSheetMenus.map(menu => menu.title)
  }

  private initUrl() {
    const { params } = this.props.navigation.state
    params && params.url && this.updateUrl(params.url)
  }

  private updateTitle(title: string) {
    webViewStore.updateTitle(title)
    this.props.navigation.setParams({ title })
  }

  private updateUrl(url: string) {
    webViewStore.updateUrl(url)
  }

  @boundMethod
  private handleWebViewStateChange(state: any) {
    this.updateUrl(state.url)
    this.updateTitle(state.title)
  }

  @boundMethod
  private handleActionSheetPress(index: number) {
    const menu = this.actionSheetMenus[index]
    menu && menu.handle && menu.handle()
  }

  render() {
    const store = webViewStore
    const { styles } = obStyles

    if (!store.url) {
      return null
    }

    return (
      <View style={styles.container}>
        <WebView
          ref={store.webViewElement}
          style={styles.webview} 
          source={{ uri: store.url }}
          onLoad={() => store.updateLoadingState(true)}
          onLoadEnd={() => store.updateLoadingState(false)}
          onNavigationStateChange={this.handleWebViewStateChange}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
        <ActionSheet
          ref={store.actionSheetElement}
          title={i18n.t(LANGUAGE_KEYS.URL_OPEN_TYPE)}
          options={[...this.actionSheetMenuNames, i18n.t(LANGUAGE_KEYS.CANCEL)]}
          cancelButtonIndex={this.actionSheetMenuNames.length}
          onPress={this.handleActionSheetPress}
        />
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      webview: {
        flex: 1,
        width: sizes.screen.width,
        height: sizes.screen.height,
        backgroundColor: colors.cardBackground
      }
    })
  }
})


import React, { Component } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { observer } from 'mobx-react/native'
import { observable, action, computed } from 'mobx'
import { WebView } from 'react-native-webview'
import { TouchableOpacity, Clipboard, Linking, StyleSheet, View } from 'react-native'
import { boundMethod } from 'autobind-decorator'
import { IPageProps, INavigationProps } from '@app/types/props'
import { getHeaderButtonStyle } from '@app/style/mixins'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
const ActionSheet = require('react-native-actionsheet').default

class WebviewPageStore {

  @observable url: string = ''
  @observable title: string | null = null
  @observable isLoading: boolean = false

  public webViewRef: React.Ref<WebView> = React.createRef()
  public actionSheetRef: React.MutableRefObject<any> = React.createRef()

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

export const webViewPageStore = new WebviewPageStore()

interface IProps extends IPageProps {}
@observer export class WebviewPage extends Component<IProps> {

  static navigationOptions = ({ navigation }: INavigationProps) => {
    const { params } = navigation.state
    const title = (params && params.title) || '...'
    const buttonStyle = getHeaderButtonStyle()
    return {
      title,
      headerLeft: (
        <TouchableOpacity
          activeOpacity={sizes.touchOpacity}
          onPress={() => navigation.goBack()}
        >
          <Ionicon name="ios-arrow-back" {...buttonStyle} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          activeOpacity={sizes.touchOpacity}
          onPress={() => {
            const { actionSheetRef } = webViewPageStore
            const actionSheet = actionSheetRef.current
            actionSheet && actionSheet.show()
          }}
        >
          <Ionicon name="ios-more" {...buttonStyle} />
        </TouchableOpacity>
      )
    }
  }

  constructor(props: IProps) {
    super(props)
    this.initUrl()
  }

  @computed private get actionSheetMenus() {
    return [
      {
        title: '浏览器打开',
        handle: () => Linking
          .openURL(webViewPageStore.url)
          .catch((error: any) => console.warn('Open url failed:', error))
      },
      {
        title: '复制链接',
        handle: () => Clipboard.setString(webViewPageStore.url)
      }
    ]
  }

  @computed private get actionSheetMenuNames() {
    return this.actionSheetMenus.map(menu => menu.title)
  }

  private initUrl() {
    const { params } = this.props.navigation.state
    params && params.url && this.updateUrl(params.url)
  }

  private updateTitle(title: string) {
    webViewPageStore.updateTitle(title)
    this.props.navigation.setParams({ title })
  }

  private updateUrl(url: string) {
    webViewPageStore.updateUrl(url)
  }

  @boundMethod private handleWebViewStateChange(state: any) {
    this.updateUrl(state.url)
    this.updateTitle(state.title)
  }

  @boundMethod private handleActionSheetPress(index: number) {
    const menu = this.actionSheetMenus[index]
    menu && menu.handle && menu.handle()
  }

  render() {
    const store = webViewPageStore
    const { styles } = obStyles
    if (!store.url) {
      return null
    }
    return (
      <View style={styles.container}>
        <WebView
          ref={store.webViewRef}
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
          ref={store.actionSheetRef}
          title={'打开方式'}
          options={[...this.actionSheetMenuNames, '取消']}
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

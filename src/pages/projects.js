import React, { Component } from 'react';
import { BackAndroid, Platform, StyleSheet, Text, View, WebView } from 'react-native';

// Components
import NavBar from '@app/components/navbar';
import CustomActivityIndicator from '@app/components/common/activity-indicator';

// External Libraries
import Ionicons from 'react-native-vector-icons/Ionicons';

// Utils
import HandleBackBtnPress from '@app/utils/handle-back-btn-press';

// Styles
import { AppColors, AppSizes } from '@app/style';

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
  webview: {
    flex: 1,
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
    marginTop: Platform.OS === 'ios' 
      ? AppSizes.navbarHeight - 5
      : AppSizes.navbarHeight + AppSizes.statusBarHeight
  }
});

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      canGoBack: false
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction.bind(this));
  }

  // webview状态改变
  onNavigationStateChange(navState) {
    this.setState({ canGoBack: navState.canGoBack });
    // console.log(this.refs.WEBVIEW_REF);
  }

  // 返回上一页Webview
  backWebViewPrevPage() {
    this.refs.WEBVIEW_REF.goBack();
  }

  // 刷新当前webview
  reloadWebView() {
    this.refs.WEBVIEW_REF.reload();
  }

  handleBackAction() {
    // webview有回退页则返回
    if (this.state.canGoBack) {
      this.backWebViewPrevPage();

    // 否则执行路由返回解析
    } else {
      HandleBackBtnPress.bind(this)();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView style={styles.webview} 
                 ref="WEBVIEW_REF"
                 onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                 source={{uri:'https://github.com/surmon-china?tab=repositories'}}
                 onLoad={() => this.setState({loading: true})}
                 onLoadEnd={() => this.setState({loading: false})}
                 startInLoadingState={true}
                 domStorageEnabled={true}
                 javaScriptEnabled={true}
        />

        <NavBar leftOn={true} 
                title={this.props.title} 
                leftIsBack={Platform.OS === 'ios' && this.state.canGoBack}
                onLeftPress={
                  Platform.OS === 'ios' 
                  ? this.handleBackAction.bind(this)
                  : this.props.openMenu
                }
                rightOn={true}
                rightText={
                  Platform.OS === 'ios' 
                  ? <Ionicons name='ios-refresh' size={32} color={AppColors.textPrimary} />
                  : <Ionicons name='md-refresh' size={24} color={AppColors.textPrimary} />
                }
                onRightPress={this.reloadWebView.bind(this)}
                />
        
      </View>
    )
  }
}

export default Projects;

import React, { Component } from 'react';
import { Alert, BackAndroid, ListView, Platform, StyleSheet, Text, View } from 'react-native';

// Components
import NavBar from '@app/components/navbar';
import ArticleList from '@app/components/article/article-list';

// Utils
import HandleBackBtnPress from '@app/utils/handle-back-btn-press';

// Styles
import { AppColors, AppSizes } from '@app/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.background,
    paddingTop: AppSizes.navbarHeight + AppSizes.statusBarHeight,
    marginBottom: Platform.OS == 'ios' ? AppSizes.navbarHeight : 0
  }
})

class Articles extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <ArticleList navigator={this.props.navigator} />
        <NavBar leftOn={true} 
                title={this.props.title} 
                onLeftPress={ () => {
                  Platform.OS === 'android' && this.props.openMenu();
                }}/>
      </View>
    )
  }
}

export default Articles;

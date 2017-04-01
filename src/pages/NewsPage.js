import React, { Component } from 'react';

import { ActivityIndicator, Alert, BackAndroid, ListView, Platform, StyleSheet, Text, View } from 'react-native';

// External Libraries
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Components
import NavBar from './../components/NavBar';
import PostList from './../components/PostList';

// Pages
import AboutUsPage from './AboutUsPage';

// Utils
import Api from './../utils/Api';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      loading: false,
      posts: dataSource
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackBtnPress);
    this.setState({loading: true});
    Api.getPostList()
    .then(data => {
      this.setState({
        posts: this.state.posts.cloneWithRows(data),
        loading: false
      });
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackBtnPress);
  }

  _handleBackBtnPress = () => {
    if (this.props.navigator.getCurrentRoutes().length <= 1) {
      Alert.alert(
        'Logout',
        'Would you like to logout?',
        [
          {text: 'NO', onPress: () => console.log('Cancel Pressed!')},
          {text: 'YES', onPress: () => BackAndroid.exitApp()},
        ]
      )
      return true;
    }
  }

  render() {
    const { posts, loading } = this.state;
    _navigator = this.props.navigator;

    return (
      <View style={styles.container}>

        { loading ? <ActivityIndicator size={'large'} color={Platform.OS === 'ios' ? "#262626" : null}/> : <PostList items={ posts } navigator={this.props.navigator}/> }

        <NavBar
          title={this.props.title}
          rightText={Platform.OS === 'ios' ? <Ionicons name="ios-information-circle" size={24} color={'#eee'} /> : <MaterialIcons name="info" size={24} color={'#eee'} />}
          leftText={<MaterialIcons name="menu" size={24} color={Platform.OS === 'android' ? '#eee' : 'transparent'} />}
          onRightPress={ () => {
            this.props.navigator.push({
              component: AboutUsPage,
              title: 'Acerca de',
            })
          }}
          onLeftPress={ () => {
            Platform.OS === 'android' && this.props.openMenu();
          }}
          containerStyle={{backgroundColor: '#303030'}}
          colorText='#eee' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ececed',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default NewsPage;

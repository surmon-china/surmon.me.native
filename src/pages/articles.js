import React, { Component } from 'react';
import { ActivityIndicator, Alert, BackAndroid, ListView, Platform, StyleSheet, Text, View } from 'react-native';

// External Libraries
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Components
import NavBar from '@components/navbar';
import PostList from '@components/article/post-list';

// Configs
import Api from '@config/api';

class Articles extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      // rowHasChanged函数可以告诉ListView它是否需要重绘一行数据（即：数据是否发生了变化
      rowHasChanged(r1, r2) {
        return r1 !== r2
      },
    });

    this.state = {
      loading: false,
      articles: dataSource
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackBtnPress);
    this.setState({loading: true});
    Api.getArticleList()
    .then(data => {
      this.setState({
        articles: this.state.articles.cloneWithRows(data.result.data),
        loading: false
      });
    })
    .catch(err => {
      console.log(err);
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
    const { articles, loading } = this.state;
    _navigator = this.props.navigator;

    /*
    <NavBar
          title={this.props.title}
          rightText={Platform.OS === 'ios' ? <Ionicons name="ios-information-circle" size={24} color={'#eee'} /> : <MaterialIcons name="info" size={24} color={'#eee'} />}
          leftText={<MaterialIcons name="menu" size={24} color={Platform.OS === 'android' ? '#eee' : 'transparent'} />}
          */
    // 为啥安卓下就可以开启菜单类

    return (
      <View style={styles.container}>

        { loading 
          ? <ActivityIndicator size={'large'} color={Platform.OS === 'ios' ? "#262626" : null}/>
          : <PostList articles={ articles } navigator={this.props.navigator}/>
        }

        <NavBar title={this.props.title} colorText='#eee' />
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

export default Articles;

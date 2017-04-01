import React, { Component } from 'react';
import { BackAndroid, ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Components
import NavBar from '@components/navbar';

// Configs
import Api from '@config/api';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userInfo: null
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackBtnPress);
    this.setState({loading: true});
    Api.getUserInfo()
    .then(data => {
      this.setState({
        userInfo: data.result,
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
    const { userInfo, loading } = this.state;
    _navigator = this.props.navigator;
    return (
      <View style={styles.container}>

        { loading 
          ? <ActivityIndicator size={'large'} color={Platform.OS === 'ios' ? "#262626" : null}/>
          : <View style={styles.container}></View>
        }

        <NavBar title={this.props.title} colorText='#eee' />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  p: {
    fontWeight: '300',
    textAlign: 'center',
  }
});

export default About;

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
	TouchalbeOpacity
} from 'react-native';
import Dimensions from 'Dimensions';

export default class LoginView extends Component {
  fetchPostsData() {
      return fetch('https://changkun.us/api/site.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    console.log(this.fetchPostsData());
    let {width, height, scale} = Dimensions.get('window');
    return (
      <View style={styles.container}>
          <Image source={require('../../assets/logo.png')} style={styles.logo}/>
          <TextInput placeholder={'请输入用户名'} style={styles.input}/>
          <TextInput placeholder={'请输入密码'} style={styles.input}/>

					{/*<TouchalbeOpacity onPress={this.loginPress()}activeOpacity={0.5}>*/}
						<View style={styles.login}>
							<Text style={{color: 'white'}}>登录</Text>
						</View>
					{/*</TouchalbeOpacity>*/}

          <View style={styles.shareAlign}>
            <View style={[{backgroundColor: 'powderblue'}, styles.share]}>
              <Text>QQ</Text>
            </View>
            <View style={[{backgroundColor: 'skyblue'}, styles.share]}>
              <Text>Wechat</Text>
            </View>
            <View style={[{backgroundColor: 'steelblue'}, styles.share]}>
              <Text>Weibo</Text>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      flexDirection: 'column',
      // justifyContent: 'center',
      alignItems: 'center'
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    marginTop: 50,
    marginBottom: 30
  },
  input: {
    backgroundColor: 'white',
    height:38,
    marginTop: 1,
    // 内容居中
    textAlign:'center'
  },
  login: {
    height: 35,
    width: 300,
    backgroundColor: 'blue',
    marginTop: 30,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  shareAlign: {
    flexDirection: 'row',

    position: 'absolute',
    bottom: 10
  },
  share: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 10
  }
});

// AppRegistry.registerComponent('LoginView', () => LoginView);

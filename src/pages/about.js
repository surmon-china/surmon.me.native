
import React, { Component } from 'react';
import { TouchableOpacity, BackAndroid, Platform, Linking, StyleSheet, Image, Text, View } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Components
import Navbar from '@app/components/navbar';
import AutoActivityIndicator from '@app/components/common/activity-indicator';

// Utils
import HandleBackBtnPress from '@app/utils/handle-back-btn-press';

// Service
import { Api } from '@app/service';

// Styles
import { AppColors, AppSizes, AppFonts } from '@app/style';

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.cardBackground
  },
  userContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  userGravatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: AppColors.textPrimary
  },
  userName: {
    ...AppFonts.h1,
    color: AppColors.textSecondary,
    marginTop: AppSizes.padding,
    marginBottom: AppSizes.padding / 2
  },
  userSlogan: {
    ...AppFonts.base,
    color: AppColors.textTitle,
    marginBottom: AppSizes.padding
  },
  userSocials: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  userSocialItem: {
    marginLeft: 10,
    marginRight: 10
  },
  userSocialIcon: {
    color: AppColors.textDefault
  }
});

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
  }

  openSocial(url) {
    Linking.openURL(url).catch(error => console.warn('An error occurred: ', error))
  }

  render() {
    const userInfo = this.props.userInfo;
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.userContent]}>
          <Image style={styles.userGravatar} source={
              userInfo ? {uri: userInfo.gravatar} : require('@app/images/gravatar.jpg')
            }/>
            <Text style={styles.userName}>{ userInfo ? userInfo.name : 'Surmon' }</Text>
            <Text style={styles.userSlogan}>{ userInfo ? userInfo.slogan : 'Talk is cheap. Show me the code.' }</Text>
          <View style={styles.userSocials}>
            <TouchableOpacity style={styles.userSocialItem} onPress={() => { this.openSocial('https://github.com/surmon-china')}}>
              <Ionicon name="logo-github" size={26} style={styles.userSocialIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userSocialItem} onPress={() => { this.openSocial('https://stackoverflow.com/users/6222535/surmon?tab=profile')}}>
              <FontAwesome name="stack-overflow" size={22} style={styles.userSocialIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userSocialItem} onPress={() => { this.openSocial('https://weibo.com/nocower')}}>
              <FontAwesome name="weibo" size={27} style={styles.userSocialIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userSocialItem} onPress={() => { this.openSocial('https://www.facebook.com/surmon.me')}}>
              <Ionicon name="logo-facebook" size={30} style={styles.userSocialIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userSocialItem} onPress={() => { this.openSocial('https://twitter.com/surmon_me')}}>
              <Ionicon name="logo-twitter" size={28} style={styles.userSocialIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userSocialItem} onPress={() => { this.openSocial('http://www.linkedin.com/in/surmon-ma-713bb6a2/')}}>
              <Ionicon name="logo-linkedin" size={30} style={styles.userSocialIcon}/>
            </TouchableOpacity>
          </View>
        </View>
        <Navbar leftOn={true} 
                title={this.props.title} 
                onLeftPress={ () => {
                  Platform.OS === 'android' && this.props.openMenu();
                }}/>
      </View>
    )
  }
}

export default About;

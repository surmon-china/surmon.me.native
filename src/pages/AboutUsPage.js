import React, { Component } from 'react';
import { BackAndroid, Platform, StyleSheet, Text, View } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Components
import NavBar from './../components/NavBar';

BackAndroid.addEventListener('hardwareBackPress', () => {
  _navigator.pop();
  return true;
});

const AboutUsPage = ({navigator}) => {
  const _navigator = navigator;

  return (
    <View style={styles.container}>
      <Text style={styles.p}>Made with ❤️ by EngineUs Team.</Text>
      <NavBar
        title="About Us"
        leftText={Platform.OS === 'ios' ? <Ionicon name='ios-arrow-back' size={32} color={'#eee'} /> : <Ionicon name='md-arrow-back' size={24} color={'#eee'} />}
        onLeftPress={ () => {
          _navigator.pop()
        }}
        containerStyle={{backgroundColor: '#303030'}}
        colorText='#eee' />
    </View>
  );
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

export default AboutUsPage;

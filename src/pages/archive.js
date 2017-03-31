import React, { Component } from 'react';
import { BackAndroid, Platform, StyleSheet, Text, View } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Components
import NavBar from '@components/navbar';

BackAndroid.addEventListener('hardwareBackPress', () => {
  _navigator.pop();
  return true;
});

const Archive = ({navigator, title}) => {
  const _navigator = navigator;

  return (
    <View style={styles.container}>
      <Text style={styles.p}>我是司马萌</Text>
      <Text>这个是归档页面，有标签有分类</Text>
      <NavBar title={title}
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

export default Archive;

import React, { Component } from 'react';
import { BackAndroid, Platform, StyleSheet, Text, View, WebView } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Components
import NavBar from '@components/navbar';

BackAndroid.addEventListener('hardwareBackPress', () => {
  _navigator.pop();
  return true;
});

const Articles = ({navigator, title}) => {
  const _navigator = navigator;

  return (
    <View style={styles.container}>
      <WebView style={styles.webview} 
               source={{uri:'https://surmon.me/project'}}
               startInLoadingState={true}
               domStorageEnabled={true}
               javaScriptEnabled={true}
      />
      <NavBar title="projects" colorText='#eee' />
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
  webview: {
    width: '100%',
    height: 100,
    marginTop: -20
  }
});

export default Articles;

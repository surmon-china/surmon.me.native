/**
 * IOS entry.
 * @file IOS 入口文件
 * @module app/ios
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react';
import { AppRegistry, StyleSheet, View, Text, Button, Image } from 'react-native';
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer, NavigationScreenProp } from "react-navigation";
// import Layout from './src/layouts/layout';
// import App from './App';
const appJson = require('./app.json');

interface IProps {
  navigation: NavigationScreenProp<any>
}
class HomeScreen extends React.Component<IProps> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen222</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Test/Details')}
        />
      </View>
    );
  }
}

class TestScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>TestScreen Screen222</Text>
      </View>
    );
  }
}

class MyHomeScreen extends React.Component<IProps> {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Text>菜单</Text>
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component<IProps> {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: () => (
      <Text>菜单</Text>
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: TestScreen,
});

const SettingsStack = createStackNavigator({
  Test: HomeScreen,
  Details: TestScreen,
});

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

const AppNavigator = createAppContainer(MyDrawerNavigator);

// const AppNavigator = createBottomTabNavigator({
//   Home: HomeStack,
//   Test: SettingsStack,
// }, {
//   initialRouteName: 'Home'
// });

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appJson.name, () => AppContainer);

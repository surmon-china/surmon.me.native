import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

// Init Layout
import Layout from './layout.js';

// Styles
import { AppColors, AppSizes } from '@app/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  launchImage: {
    position: 'absolute',
    left: 0, 
    top: 0, 
    width: AppSizes.screen.width,
    height: AppSizes.screen.height
  }
});

class Welcome extends Component {

  componentWillMount () {
    var navigator = this.props.navigator;
    setTimeout (() => {
      navigator.replace({component: Layout, passProps: { navigator }});
    }, 1666);
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar
            translucent={true}
            backgroundColor={'#rgba(0, 0, 0, 0)'}
            barStyle="light-content"
            showHideTransition='slide'
            hidden={false}
        />
        <Image style={styles.launchImage} source={require('@app/images/android-launch/launch-image.png')}></Image>
      </View>
    );
  }
}

export default Welcome;

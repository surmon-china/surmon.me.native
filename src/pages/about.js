
import React, { Component } from 'react';
import { BackAndroid, Platform, StyleSheet, Text, View } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Components
import Navbar from '@app/components/navbar';
import AutoActivityIndicator from '@app/components/common/activity-indicator';

// Utils
import HandleBackBtnPress from '@app/utils/handle-back-btn-press';

// Service
import { Api } from '@app/service';

// styles
const styles = StyleSheet.create({
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

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userInfo: null
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
  }

  render() {
    const { userInfo, loading } = this.state;
    return (
      <View style={styles.container}>

        <View style={styles.container}></View>

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

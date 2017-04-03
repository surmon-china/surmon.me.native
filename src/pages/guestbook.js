import React, { Component } from 'react';
import { BackAndroid, Platform, StyleSheet, Text, View } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Components
import NavBar from '@app/components/navbar';

// Utils
import HandleBackBtnPress from '@app/utils/handle-back-btn-press';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
    // this.setState({loading: true});
    // Api.getArticleList()
    // .then(data => {
    //   this.setState({
    //     articles: this.state.articles.cloneWithRows(data.result.data),
    //     loading: false
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.p}>我是司马萌</Text>
        <Text>这个是留言板页面</Text>
        <NavBar leftOn={true} 
                title={this.props.title} 
                onLeftPress={ () => {
                  Platform.OS === 'android' && this.props.openMenu();
                }}/>
      </View>
    );
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

export default Archive;

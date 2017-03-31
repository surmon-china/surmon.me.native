import React, { Component } from 'react';
import { ActivityIndicator, BackAndroid, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

// Icons
import Ionicon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Markdown from 'react-native-markdown';

// Components
import NavBar from '@components/navbar';

// Configs
import Api from '@config/api';

// utils
import filters from '@utils/filters';
const { toYMD, descLimit, buildThumb } = filters;

// 用户计算缩略图高度
const { width, height } = Dimensions.get('window');

// component
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      article: this.props.article
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackBtnPress);
    this.setState({loading: true});
    Api.getArticleDetail(this.props.article.id).then(data => {
      this.setState({ article: data.result, loading: false });
    });
  }

  componentWillUnmount() {
    // 移除安卓物理按键监听
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackBtnPress);
  }

  _handleBackBtnPress = () => {
    if (this.props.navigator.getCurrentRoutes().length <= 1) {
      Alert.alert(
        '要走吗',
        '真的要走？',
        [
          {text: '真的不走', onPress: () => console.log('Cancel Pressed!')},
          {text: '不走', onPress: () => BackAndroid.exitApp()}
        ]
      )
      return true;
    }
  }

  render() {
    const { detail, article, loading } = this.state;
    const _navigator = this.props.navigator;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{height: height - 200}}>
          <Image source={buildThumb(article.thumb)} style={styles.image}>
            <View style={styles.innerImage}>
              <Text style={styles.title}>{ article.title }</Text>
              <View style={styles.meta}>
                { article.category.length
                   ? <View style={[styles.metaItem, styles.metaItemLeft]}>
                      <CommunityIcon name="book-open-variant" size={17} style={[styles.metaIcon, styles.metaText]}/>
                      <Text style={styles.metaText}>{ String(article.category.map(c => c.name).join('、')) }</Text>
                     </View>
                   : null
                }
                <View style={[styles.metaItem, styles.metaItemLeft]}>
                  <CommunityIcon name="eye" size={17} style={[styles.metaIcon, styles.metaText]}/>
                  <Text style={styles.metaText}>{ article.meta.views }</Text>
                </View>
                <View style={styles.metaItem}>
                  <CommunityIcon name="clock" size={17} style={[styles.metaIcon, styles.metaText, styles.metaDateIcon]}/>
                  <Text style={styles.metaText}>{ toYMD(article.create_at) }</Text>
                </View>
              </View>
            </View>
          </Image>
          { loading 
              ? <ActivityIndicator size={'large'} 
                                   style={styles.indicator}
                                   color={Platform.OS === 'ios' ? "#262626" : null}/>
              : <Markdown style={styles.content}>{ article.content }</Markdown>
          }
          <NavBar
            leftText={Platform.OS === 'ios' ? <Ionicon name='ios-arrow-back' size={32} color={'#eee'} /> : <Ionicon name='md-arrow-back' size={24} color={'#eee'} />}
            onLeftPress={() => { _navigator.pop() }}
            containerStyle={{backgroundColor: 'transparent'}}
            colorText='#eee' />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width,
    height: 300,
    resizeMode: 'cover',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  innerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  title: {
    margin: 15,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center'
  },
  meta: {
    flexDirection: 'row',
    borderTopColor: '#eaeaea',
    borderTopWidth: 1,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  metaItemLeft: {
    marginRight: 10,
  },
  metaIcon: {
    padding: 3,
    marginRight: 5
  },
  metaText: {
    color: '#fff'
  },
  metaDateIcon: {
    marginTop: 2
  },
  indicator: {
    marginTop: (height - 300) / 2,
  },
  content: {
    margin: 15,
    padding: 20,
    textAlign: 'justify'
  },
  floatFooter: {
    position: 'absolute',
    bottom: 0
  }
})

export default Detail;

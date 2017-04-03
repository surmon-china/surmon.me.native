import React, { Component } from 'react';
import { ActivityIndicator, WebView, BackAndroid, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

// Icons
import Ionicon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// third libs
import HTMLView from 'react-native-htmlview';

// Components
import NavBar from '@app/components/navbar';
import AutoActivityIndicator from '@app/components/common/activity-indicator';

// Service
import { Api } from '@app/service';

// Utils
import marked from '@app/utils/marked';
import filters from '@app/utils/filters';
const { toYMD, descLimit, buildThumb } = filters;
import HandleBackBtnPress from '@app/utils/handle-back-btn-press';

// Styles
import { AppSizes } from '@app/style';

// 处理html解析
const renderNode = (node, index, siblings, parent) => {
  if (node.name == 'iframe') {
    const a = node.attribs;
    return (
      <View key={index} style={{width: Number(a.width), height: Number(a.height)}}>
        <WebView source={{html: `<iframe src="${a.src}"></iframe>`}} />
      </View>
    );
  } else if (node.name == 'img') {
    return (
      <View key={index} style={{width: 100, height: 100}}>
        <Image source={{uri: node.attribs.src}} style={htmlStyles.img} />
      </View>
    )
  } else if (node.type == 'text') {
    // console.log(node)
    if (node.parent && node.parent && node.parent.name == 'p') {
      node.data = `         ${node.data}`
    } else {
      node.data = `    ${node.data}`
    }
  } else if (['pre', 'br', 'p'].includes(node.name) || node.name.includes('h')) {
    // console.log(node)
    // return null
  }
}

// component
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      article: this.props.article,
      articleContent: '<p>loading...</p>'
    };
  }

  // 组件加载完成
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
    this.setState({loading: true});
    Api.getArticleDetail(this.props.article.id).then(data => {
      this.setState({
        article: data.result,
        articleContent: String(marked(data.result.content || ' ')),
        loading: false
      });
      // console.log(this.state.articleContent);
    });
  }

  // 组件即将释放
  componentWillUnmount() {
    // 移除安卓物理按键监听
    BackAndroid.removeEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
  }

  render() {
    const { detail, article, loading, articleContent } = this.state;
    const _navigator = this.props.navigator;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{height: AppSizes.screen.height - 200}}>
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
              ? <AutoActivityIndicator style={styles.indicator}/>
              : <View style={styles.content}><HTMLView value={articleContent} stylesheet={htmlStyles} renderNode={renderNode}/></View>
          }
          <NavBar leftOn={true}
                  containerStyle={{backgroundColor: 'transparent'}} />
        </ScrollView>
      </View>
    )
  }
}

const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: 'bold',
    color: '#555',
    textDecorationLine: 'underline'
  },
  p: {
    width: 100,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 26
  },
  img: {
    flex: 1,
    width: AppSizes.screen.width - 40,
    resizeMode: 'cover',
    overflow: 'visible'
  },
  h3: {
    lineHeight: 30
  },
  h4: {
    lineHeight: 30
  },
  li: {
    paddingLeft: 20,
    lineHeight: 28,
    marginBottom: 0
  }
});

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: AppSizes.screen.width,
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
    fontSize: 25,
    lineHeight: 35,
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
    marginTop: (AppSizes.screen.height - 300) / 2,
  },
  content: {
    padding: 20
  },
  floatFooter: {
    position: 'absolute',
    bottom: 0
  }
})

export default Detail;

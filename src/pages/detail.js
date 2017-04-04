import React, { Component } from 'react';
import { ActivityIndicator, WebView, BackAndroid, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

// Icons
import Ionicon from 'react-native-vector-icons/Ionicons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// third libs
import HTMLView from 'react-native-htmlview';
import Markdown from 'react-native-simple-markdown';

// Components
import NavBar from '@app/components/navbar';
import AutoActivityIndicator from '@app/components/common/activity-indicator';

// Service
import { Api } from '@app/service';

// Utils
import filters from '@app/utils/filters';
const { toYMD, descLimit, buildThumb } = filters;
import HandleBackBtnPress from '@app/utils/handle-back-btn-press';

// Styles
import { AppColors, AppSizes, AppFonts } from '@app/style';

// markdown styles
const markdownStyles = {
  // 链接
  link: {
    fontWeight: 'bold',
    color: AppColors.textTitle,
    textDecorationLine: 'underline'
  },
  mailTo: {
    color: 'orange',
  },
  // 段落
  text: {
    color: AppColors.textTitle,
    fontSize: AppFonts.base.size,
    fontFamily: AppFonts.base.family,
    lineHeight: Platform.OS == 'ios' ? AppFonts.h3.lineHeight : AppFonts.h2.lineHeight
  },
  // 图片
  image: {
    flex: 1,
    width: AppSizes.screen.width - AppSizes.padding * 2,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 0
  },
  heading1: {
    ...AppFonts.h1
  },
  heading2: {
    ...AppFonts.h2
  },
  heading3: {
    ...AppFonts.h3
  },
  heading4: {
    ...AppFonts.h4
  },
  heading5: {
    ...AppFonts.h5
  },
  list: {
    paddingLeft: AppSizes.padding,
    marginBottom: AppSizes.padding / 2
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: AppSizes.screen.width,
    height: 260,
    resizeMode: 'cover',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  innerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  title: {
    margin: 15,
    ...AppFonts.h1,
    lineHeight: 40,
    fontWeight: '500',
    textAlign: 'center',
    color: AppColors.cardBackground
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: AppSizes.padding / 2,
    borderTopColor: AppColors.cardBackground,
    borderTopWidth: 1
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  metaItemLeft: {
    marginRight: AppSizes.padding / 2,
  },
  metaIcon: {
    padding: 3,
    marginRight: 5
  },
  metaText: {
    color: AppColors.cardBackground
  },
  metaDateIcon: {
    marginTop: 2
  },
  indicator: {
    marginTop: (AppSizes.screen.height - 260) / 2
  },
  content: {
    padding: AppSizes.padding
  },
  floatFooter: {
    position: 'absolute',
    bottom: 0
  }
})

const markdownRules = {
  text: {
    react(node, output, state) {
      return (
        <Text style={markdownStyles.text} key={state.key}>{`\u00A0\u00A0\u00A0\u00A0${node.content}`}</Text>
      )
    }
  },
  image: {
    react(node, output, state) {
      const imageSrc = node.target.replace(/^http:\/\//ig, "https://surmon.me/proxy/");
      return (
        <Image
          key={state.key}
          source={{uri: imageSrc}}
          style={markdownStyles.image}
        />
      )
    }
  }
}

// component
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      article: this.props.article,
      articleContent: ''
    }
  }

  // 组件加载完成
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
    this.setState({loading: true});
    Api.getArticleDetail(this.props.article.id).then(data => {
      this.setState({
        loading: false,
        article: data.result,
        articleContent: String(data.result.content || ' ')
      })
    })
  }

  // 组件即将释放
  componentWillUnmount() {
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
              : <View style={styles.content}>
                  <Markdown styles={markdownStyles} rules={markdownRules}>{articleContent}</Markdown>
                </View>
          }
          <NavBar leftOn={true}
                  navigator={this.props.navigator}
                  containerStyle={{backgroundColor: 'transparent'}} />
        </ScrollView>
      </View>
    )
  }
}

export default Detail;

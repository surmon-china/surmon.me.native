import React, { Component, createElement } from 'react';
import { TouchableOpacity, AsyncStorage, WebView, Alert, BackAndroid, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// third libs
import HTMLView from 'react-native-htmlview';
import Markdown from 'react-native-simple-markdown';
import _ from 'lodash'

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

const containerWidth = AppSizes.screen.width - AppSizes.padding * 2;

// markdown styles
const markdownStyles = {
  // 链接
  link: {
    fontWeight: 'bold',
    color: AppColors.textTitle,
    textDecorationLine: 'underline'
  },
  mailTo: {
    fontWeight: 'bold',
    color: AppColors.textTitle,
    textDecorationLine: 'underline'
  },
  del: {
    textDecorationLine:'line-through'
  },
  // 段落
  text: {
    color: AppColors.textTitle,
    fontSize: AppFonts.base.size,
    fontFamily: AppFonts.base.family,
    lineHeight: Platform.OS == 'ios' ? AppFonts.h3.lineHeight : AppFonts.h2.lineHeight
  },
  // 粗体
  strong: {
    fontWeight: '900',
    marginTop: 0,
    marginBottom: 10
  },
  // 引用
  blockQuoteSection: {
    padding: 10,
    paddingTop: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: AppColors.textPrimary
  },
  blockQuoteSectionBar: {
    height: null,
    backgroundColor: AppColors.textMuted
  },
  // 行内代码块
  inlineCode: {
    margin: 3,
    padding: 3,
    fontFamily: 'Courier',
    fontWeight: '200',
    color: AppColors.brand.black
  },
  // 图片
  image: {
    flex: 1,
    width: containerWidth,
    height: Platform.OS == 'ios' ? 166 : (containerWidth) * 2,
    resizeMode: 'contain',
    marginBottom: 0
  },
  heading1: {
    ...AppFonts.h1,
    color: AppColors.textTitle,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
  },
  heading2: {
    ...AppFonts.h2,
    color: AppColors.textTitle,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
  },
  heading3: {
    ...AppFonts.h3,
    color: AppColors.textTitle,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10
  },
  heading4: {
    ...AppFonts.h4,
    color: AppColors.textTitle,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
  },
  heading5: {
    ...AppFonts.h5,
    color: AppColors.textTitle,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
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
    padding: AppSizes.padding,
    marginBottom: AppSizes.padding * 2
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: AppSizes.screen.width,
    height: AppSizes.padding * 2.2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background
  },
  footerItem: {
    width: AppSizes.screen.width / 2,
    height: AppSizes.padding * 2.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerItemIcon: {
    marginRight: 10,
    color: AppColors.textTitle
  },
  footerItemIconText: {
    color: AppColors.textTitle
  }
})

const markdownRules = {
  inlineCode: {
    react(node, output, state) {
      state.withinText = true;
      return (
        <Text style={markdownStyles.inlineCode} key={state.key}>{node.content}</Text>
      )
    }
  },
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
      articleContent: '',
      liked: false
    }
    // 获取本地存储记录
    AsyncStorage.getItem('user_like_history')
    .then(historyLikes => {
      this.historyLikes = historyLikes ? JSON.parse(historyLikes) : []
    }).catch(err => {
      console.log(err)
    })
  }

  // 组件加载完成
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', HandleBackBtnPress.bind(this));
    this.setState({loading: true});
    Api.getArticleDetail(this.props.article.id).then(data => {
      this.setState({
        loading: false,
        article: data.result,
        articleContent: data.result.content
      })
      if (this.historyLikes.length) {
        if (this.historyLikes.includes(this.state.article.id)) {
          this.setState({ liked: true });
        }
      }
    }).catch(err => {
      console.log(err);
    })
  }

  // 喜欢文章
  likeArticle() {
    if (this.state.liked) return false;
    Api.likeArticleOrSite({
      type: 2,
      id: this.props.article.id
    }).then(data => {
      this.state.liked = true;
      this.state.article.meta.likes += 1;
      this.forceUpdate();
      this.historyLikes.push(this.state.article.id);
      AsyncStorage.setItem('user_like_history', JSON.stringify(this.historyLikes))
    }).catch(err => {
      console.log(err);
    })
  }

  // 去留言板
  toComment() {
    Alert.alert('功能还没做');
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
                  <Markdown styles={markdownStyles} 
                  rules={markdownRules}
                  blacklist={['list']}>{articleContent}</Markdown>
                </View>
          }
          <NavBar leftOn={true}
                  navigator={this.props.navigator}
                  containerStyle={{backgroundColor: 'transparent'}} />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={this.toComment}>
            <Icon name="comment" size={17} style={styles.footerItemIcon}/>
            <Text style={styles.footerItemIconText}>{ `评论 (${article.meta.comments})` }</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={this.likeArticle.bind(this)}>
            <Icon name={this.state.liked ? 'favorite' : 'favorite-border'} 
                  size={17} 
                  style={[styles.footerItemIcon, {
                    color: this.state.liked ? 'red' : AppColors.textTitle
                  }]}/>
            <Text style={[styles.footerItemIconText, {
                    color: this.state.liked ? 'red' : AppColors.textTitle
                  }]}>{ `${this.state.liked ? '已' : ''}喜欢 (${article.meta.likes})` }</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Detail;

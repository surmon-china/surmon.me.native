
/*
*
* 文章列表组件
*
*/

import React, { Component } from 'react';
import { ListView, Dimensions, AsyncStorage, Platform, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

// 加载刷新组件
import GiftedListView from 'react-native-gifted-listview';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Components
import AutoActivityIndicator from '@app/components/common/activity-indicator';

// Item
import ArticleListItem from './article-list-item'

// Service
import { Api } from '@app/service';

// Styles
import { AppColors, AppSizes, AppFonts } from '@app/style';

// list styles
const styles = StyleSheet.create({
  listViewContainer: {
    position: 'relative',
    flex: 1
  },
  ArticleListView: {
    // marginTop: 10
  },
  ArticleListIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background
  },
  ArticleListIndicatorTitle: {
    textAlign: 'center',
    width: AppSizes.screen.width,
    marginTop: AppSizes.padding / 2,
    color: AppColors.textDefault
  }
});

// component styles
const customListStyles = {
  // 各种行为按钮的样式
  actionsLabel: {
    fontSize: AppFonts.h2.fontSize,
    color: AppColors.brand.primary,
  },
  // 翻页组件
  paginationView: {
    height: AppSizes.padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.cardBackground,
    marginLeft: AppSizes.padding / 2,
    marginRight: AppSizes.padding / 2,
    marginBottom: AppSizes.padding / 2
  },
  // 首次请求无数据的组件
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppSizes.padding,
  },
  // 首次请求无数据的组件
  defaultViewTitle: {
    ...AppFonts.h4,
    color: AppColors.textDefault,
    marginBottom: AppSizes.padding * 0.75
  }
};

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      firstLoader: true
    };
    // 获取本地存储记录
    AsyncStorage.getItem('user_like_history')
    .then(historyLikes => {
      this.historyLikes = historyLikes ? JSON.parse(historyLikes) : []
    }).catch(err => {
      console.log(err)
    })
  }

  // article item render
  renderRowView(article, sectionID, rowID) {
    let liked = false;
    if (this.historyLikes && this.historyLikes.length && this.historyLikes.includes(article.id)) {
      liked = true;
    }
    return (
      <ArticleListItem article={article} 
                       rowID={rowID}
                       liked={liked}
                       key={`sep:${sectionID}:${rowID}`} 
                       navigator={this.props.navigator} />
    )
  }

  // 请求数据
  getArticles(page = 1, callback, options) {
    this.setState({ loading: true });
    Api.getArticleList(page)
    .then(data => {
      this.setState({ loading: false, firstLoader: false });
      const pagination = data.result.pagination;
      callback(data.result.data, {
        allLoaded: pagination.total_page < 2 || pagination.current_page >= pagination.total_page,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  // 在第一次读取时没有行显示时呈现视图，refreshcallback函数的函数调用刷新列表
  renderEmptyView(refreshCallback) {
    return (
      <View style={customListStyles.defaultView}>
        <Text style={customListStyles.defaultViewTitle}>暂无数据，下拉刷新重试</Text>
        <TouchableHighlight underlayColor={AppColors.textDefault} onPress={refreshCallback}>
          <Ionicon name="md-refresh" size={22} style={{color: AppColors.textDefault}}/>
        </TouchableHighlight>
      </View>
    );
  }

  // 翻页正常状态
  renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight
          onPress={paginateCallback}
          underlayColor={AppColors.textMuted}
          style={customListStyles.paginationView}>
        <Text style={
          [customListStyles.actionsLabel, { 
            fontSize: AppFonts.base.fontSize, 
            color: AppColors.textDefault
          }]
        }>加载更多</Text>
      </TouchableHighlight>
    );
  }

  // 翻页在请求时的状态
  renderPaginationFetchingView() {
    return (
      <View style={[customListStyles.paginationView, { backgroundColor: 'transparent' }]}>
        <AutoActivityIndicator size={'small'} />
      </View>
    )
  }

  // 翻页在文章全部加载完时的状态
  renderPaginationAllLoadedView() {
    return (
      <View style={[customListStyles.paginationView, {
        height: AppSizes.padding * 1.5,
        marginBottom: AppSizes.padding / 2,
        backgroundColor: AppColors.background 
      }]}>
         <Text style={
          [customListStyles.actionsLabel, { 
            fontSize: AppFonts.base.fontSize, 
            color: AppColors.textMuted
          }]
        }>到底啦~</Text>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.listViewContainer}>
        <GiftedListView
          style={styles.ArticleListView}
          firstLoader={true}
          initialListSize={10}
          withSections={false}
          enableEmptySections={true}
          rowView={this.renderRowView.bind(this)}
          onFetch={this.getArticles.bind(this)}
          rowHasChanged={(r1,r2) => { r1.id !== r2.id }}

          emptyView={this.renderEmptyView}

          refreshable={true}
          refreshableTitle={'更新数据...'}
          refreshableTintColor={AppColors.brand.black}
          refreshableColors={[AppColors.brand.primary]}

          pagination={true}
          paginationFetchingView={this.renderPaginationFetchingView}
          paginationWaitingView={this.renderPaginationWaitingView}
          paginationAllLoadedView={this.renderPaginationAllLoadedView}
        />
        {
          this.state.firstLoader
          ?  <View style={styles.ArticleListIndicator}>
              <AutoActivityIndicator />
              {
                Platform.OS == 'ios'
                ? <Text style={styles.ArticleListIndicatorTitle}>数据加载中...</Text>
                : null
              }
            </View>
          : null
        }
      </View>
    )
  }
}

export default ArticleList;

/*
* 文章列表组件
*/

import React, { Component } from 'react';
import { ListView, Platform, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

// 加载刷新组件
import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';

// Item
import ArticleListItem from './article-list-item'

// Service
import { Api } from '@app/service';

// list styles
const styles = StyleSheet.create({
  listView: {
    marginBottom: 10
  }
});

// component styles
const customStylesa = {
  paginationView: {
    backgroundColor: '#eee',
  }
}

const customStyles = {
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
  refreshableView: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#007aff',
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    padding: 10,
    height: 44,
  },
  header: {
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },
};

const screenStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#007aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  }
};

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      firstLoader: true
    };
  }

  // article item render
  renderRowView(article, sectionID, rowID) {
    return (
      <ArticleListItem article={article} 
                       key={`sep:${sectionID}:${rowID}`} 
                       navigator={this.props.navigator} />
    );
  };

  // 请求数据
  onFetch(page = 1, callback, options) {
    console.log('onFetch')
    this.setState({ loading: true });
    Api.getArticleList()
    .then(data => {
      this.setState({
        loading: false,
        firstLoader: false
      });
      callback(data.result.data, {
        allLoaded: false,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  /**
   * 已下拉等待释放前的组件
   * refreshCallback用于触发刷新
   */
  renderRefreshableWaitingView(refreshCallback) {
    if (Platform.OS !== 'android') {
      return (
        <View style={customStyles.refreshableView}>
          <Text style={customStyles.actionsLabel}>
            ↓
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          style={customStyles.refreshableView}
        >
          <Text style={customStyles.actionsLabel}>
            ↻
          </Text>
        </TouchableHighlight>
      );
    }
  }

  // 渲染刷新视图的下拉刷新时被激活，准备刷新  
  renderRefreshableWillRefreshView() {
    return (
      <View style={customStyles.refreshableView}>
        <Text style={customStyles.actionsLabel}>
          ↻
        </Text>
      </View>
    );
  }

  // 正在刷新试图   
  renderRefreshableFetchingView() {
    return (
      <View style={customStyles.refreshableView}>
        <GiftedSpinner />
      </View>
    );
  }

  // 翻页正在请求中时的状态
  renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
          Load more
        </Text>
      </TouchableHighlight>
    );
  }

  // 正在请求时的翻页状态
  renderPaginationFetchigView() {
    return (
      <View style={customStyles.paginationView}>
        <GiftedSpinner />
      </View>
    );
  }

  // 文章全部加载完时翻页的状态
  renderPaginationAllLoadedView() {
    return (
      <View style={customStyles.paginationView}>
        <Text style={customStyles.actionsLabel}>
          ~
        </Text>
      </View>
    );
  }

  // 在第一次读取时没有行显示时呈现视图
  // @param { } refreshcallback函数的函数调用刷新列表
  renderEmptyView(refreshCallback) {
    return (
      <View style={customStyles.defaultView}>
        <Text style={customStyles.defaultViewTitle}>
          Sorry, there is no content to display
        </Text>

        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  render(){
    return (
      <GiftedListView
        rowView={this.renderRowView.bind(this)}
        onFetch={this.onFetch.bind(this)}
        firstLoader={this.state.firstLoader}
        initialListSize={10}
        withSections={false}
        enableEmptySections={true}
        style={
          styles.listView
        }
        customStyles={{
          paginationView: {
            backgroundColor: '#eee',
          }
        }}

        emptyView={this.renderEmptyView}

        PullToRefreshViewAndroidProps={{
          colors: ['#fff'],
          progressBackgroundColor: '#003e82',
        }}

        rowHasChanged={(r1,r2)=>{
          r1.id !== r2.id
        }}

        refreshableTintColor="blue"
        refreshable={true}
        refreshableViewHeight={50}
        refreshableDistance={40}
        refreshableFetchingView={this.renderRefreshableFetchingView}
        refreshableWillRefreshView={this.renderRefreshableWillRefreshView}
        refreshableWaitingView={this.renderRefreshableWaitingView}

        pagination={false}
        pagination={true}
        paginationFetchigView={this.renderPaginationFetchigView}
        paginationAllLoadedView={this.renderPaginationAllLoadedView}
        paginationWaitingView={this.renderPaginationWaitingView}
      />
    )
  }
}

export default PostList;

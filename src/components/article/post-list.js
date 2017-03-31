/*
* 文章列表组件
*/

import React from 'react';

import { ListView, StyleSheet } from 'react-native';

import PostItem from './post-item'

const PostList = ({articles, navigator}) => {
   renderRow = (article, sId, rId) => {
     return (
       <PostItem article={article} key={rId} navigator={navigator} />
     );
   };

   return (
     <ListView dataSource={ articles }
               style={styles.listView}
               removeClippedSubviews={false}
               renderRow={this.renderRow}
               automaticallyAdjustContentInsets={false} />
   )
 }

 const styles = StyleSheet.create({
   listView: {
     paddingTop: 70
   }
 });

 export default PostList;

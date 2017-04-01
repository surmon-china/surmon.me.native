import React from 'react';

import { ListView, StyleSheet } from 'react-native';

import PostItem from './PostItem'

const PostList = ({items, navigator}) => {
   renderRow = (item, sId, rId) => {
     return (
       <PostItem item={item} key={rId} navigator={navigator} />
     );
   };

   return (
     <ListView dataSource={ items }
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

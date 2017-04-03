
/*
*
* 文章列表的单个文章组件
*
*/

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Pages
import Detail from '@app/pages/detail';

// utils
import filters from '@app/utils/filters';
const { toYMD, descLimit, buildThumb } = filters;

const PostItem = ({article, navigator}) => {

  // 组件
  return (
    <TouchableOpacity activeOpacity={0.6}
                      style={styles.container}
                      onPress={() => {
                        navigator.push({component: Detail, passProps: {article}})
                      }}>
      <Image source={buildThumb(article.thumb)} style={styles.thumb}/>
      <Text style={styles.title} numberOfLines={1}>{ article.title }</Text>
      <Text style={styles.description}>{ descLimit(article.description) }</Text>
      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <CommunityIcon name="eye" size={17} style={styles.metaIcon}/>
          <Text style={styles.metaText}>{ article.meta.views }</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="comment" size={17} style={styles.metaIcon}/>
          <Text style={styles.metaText}>{ article.meta.comments }</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="favorite" size={17} style={styles.metaIcon}/>
          <Text style={styles.metaText}>{ article.meta.likes }</Text>
        </View>
        <View style={styles.metaItem}>
          <CommunityIcon name="clock" size={17} style={[styles.metaIcon, styles.metaDateIcon]}/>
          <Text style={styles.metaText}>{ toYMD(article.create_at) }</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
 }

 const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff'
  },
  thumb: {
    flex: 1,
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  title: {
    margin: 15,
    marginBottom: 0,
    fontSize: 17,
    fontWeight: '500'
  },
  description: {
    margin: 15,
    marginTop: 7,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'left',
    color: '#aaa'
  },
  meta: {
    flexDirection: 'row',
    borderTopColor: '#eaeaea',
    borderTopWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  metaIcon: {
    padding: 3,
    marginRight: 5,
    color: '#aaa'
  },
  metaDateIcon: {
    marginTop: 2
  },
  metaText: {
    color: '#aaa'
  }
 });

 export default PostItem;

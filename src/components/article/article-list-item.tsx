
/*
*
* 文章列表的单个文章组件
*
*/

import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Detail from '@app/pages/detail';
import { toYMD, descLimit, buildThumb } from '@app/utils/filters';
import colors from '@app/style/colors';
import * as sizes from '@app/style/sizes';
import * as fonts from '@app/style/fonts';

const styles = StyleSheet.create({
  container: {
    margin: sizes.padding / 2,
    backgroundColor: colors.cardBackground
  },
  thumb: {
    flex: 1,
    maxWidth: sizes.screen.width - 20,
    height: 150,
    resizeMode: 'cover'
  },
  title: {
    margin: sizes.padding * 0.75,
    marginBottom: 0,
    ...fonts.h3,
    color: colors.textTitle,
    fontWeight: '500'
  },
  description: {
    margin: sizes.padding * 0.75,
    marginTop: sizes.padding / 3,
    fontSize: 13,
    lineHeight: Platform.OS == 'ios' ? 20 : 24,
    textAlign: 'left',
    color: colors.textDefault
  },
  meta: {
    flexDirection: 'row',
    borderTopColor: colors.textPrimary,
    borderTopWidth: 1,
    padding: sizes.padding / 2,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  metaIcon: {
    padding: sizes.padding * 0.15,
    marginRight: 5,
    color: colors.textDefault
  },
  metaDateIcon: {
    marginTop: Platform.OS == 'ios' ? 2 : 0
  },
  metaText: {
    color: colors.textDefault
  }
});

export const ArticleListItem = ({article, liked, rowID, navigator}) => {

  // 组件
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, {
        marginTop: rowID == 0 ? sizes.padding : sizes.padding / 2
      }]}
      onPress={() => {
        // navigator.push({component: Detail, passProps: {article}})
      }}
    >
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
          <Icon name="favorite" size={17} style={[styles.metaIcon, {
            color: liked ? 'red' : colors.textDefault
          }]}/>
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

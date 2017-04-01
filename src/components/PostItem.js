import React from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Components
import Counts from './Counts';

// Pages
import NewsDetailPage from './../pages/NewsDetailPage';

const PostItem = ({item, navigator}) => {
  return (
    <TouchableOpacity style={styles.row}
                      activeOpacity={0.6}
                      onPress={ () => navigator.push({component: NewsDetailPage, passProps: {item: item}}) }>
      <Image source={{uri: item.imageUrl, height: 150}}
             style={styles.image}/>

      <Text style={styles.title}>
        { item.title }
      </Text>

      <Text style={styles.description}>
        { item.body.length < 80 ? item.body : `${item.body.slice(0, 80)}...`}
      </Text>

      <View style={styles.referenceContainer}>
        <Counts item={item} />
        <View style={styles.speakerContainer}>
          <Text style={styles.speakerText}>By { item.speaker }</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
 }

 const styles = StyleSheet.create({
   image: {
     flex: 1,
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
     textAlign: 'justify',
     color: '#aaa'
   },
   row: {
     margin: 15,
     borderRadius: 3,
     backgroundColor: '#fff',
     shadowColor: '#303030',
     shadowOffset: {
       width: 0,
       height: 2
     },
     shadowOpacity: 0.1
   },
   referenceContainer: {
     flexDirection: 'row',
     borderTopColor: '#eaeaea',
     borderTopWidth: 1,
     padding: 15
   },
   speakerContainer: {
     flex: 0.6,
     alignItems: 'flex-end',
   },
   speakerText : {
     fontStyle: 'italic',
     color: '#aaa',
     marginTop: 5
   }
 });

 export default PostItem;

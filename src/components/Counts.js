import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// External Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';

const Counts = ({item}) =>
  <View style={styles.countsContainer}>
    <View style={styles.horizontal}>
      <View style={styles.iconCountContainer}>
        <Icon name="comment" size={14} />
      </View>
      <Text style={styles.countText}>{ item.comments }</Text>
    </View>
    <TouchableOpacity style={styles.horizontal}
                      onPress={ () => alert('I like it!') }>
      <View style={styles.iconCountContainer}>
        <Icon name={ item.liked ? 'favorite-border' : 'favorite' } size={14} />
      </View>
      <Text style={styles.countText}>{ item.likes }</Text>
    </TouchableOpacity>
  </View>

 const styles = StyleSheet.create({
   countsContainer: {
     flex: 0.4,
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems: 'center'
   },
   horizontal: {
     flexDirection: 'row',
   },
   iconCountContainer: {
     marginRight: 5,
     borderRadius: 15,
     height: 30,
     width: 30,
     padding: 6.2,
     borderColor: '#d6d6d6',
     borderWidth: 2,
   },
   countText: {
     marginTop: 5
   }
 });

 export default Counts;

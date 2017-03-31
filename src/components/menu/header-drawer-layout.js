import React from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';

const HeaderDrawerLayout = (props) =>
<View style={styles.headerContainer}>
  <Text style={styles.headerText}>EngineUs</Text>
  <Text style={styles.versionText}>Versión 1.0</Text>
</View>

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width - 56,
    height: ((Dimensions.get('window').width - 56) * 9) / 16,
    backgroundColor: '#303030',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    marginLeft: 14,
    marginBottom: 4,
  },
  versionText : {
    color: 'white',
    fontSize: 14,
    marginLeft: 14,
    marginBottom: 8,
  }
});

 export default HeaderDrawerLayout;

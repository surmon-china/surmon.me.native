import React from 'react';

import { TabBarIOS } from 'react-native';

const MenuItem = (props) => {
  const TabBarItem = props.itemComponent || TabBarIOS.Item;

  _onPressItem = () => {
    props.onPress(props.id);
  }

  return (
    <TabBarItem {...props}
      onPress={this._onPressItem}>
      {props.children}
    </TabBarItem>
  )
}

export default MenuItem;

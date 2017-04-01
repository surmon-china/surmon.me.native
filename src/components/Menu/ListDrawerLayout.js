import React from 'react';

import { Dimensions, ListView, StyleSheet } from 'react-native';

// Components
import MenuItem from './MenuItem';

const ListDrawerLayout = (props) => {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const _renderRow = (item) => {
    return (
      <MenuItem
        id={item.id}
        title={item.title}
        tintColor={'#333'}
        icon={item.androidIcon}
        background={item.androidBackground}
        isSelected={props.selectedItem === item.id}
        onPress={(section) => props.onSectionChange(section)}
      />
    )
  }

  return (
    <ListView
      dataSource={dataSource.cloneWithRows(props.items)}
      renderRow={_renderRow}
    />
  )
}

export default ListDrawerLayout;

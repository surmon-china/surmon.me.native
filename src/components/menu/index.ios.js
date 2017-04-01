import React, { Component } from 'react';

import { TabBarIOS } from 'react-native';

// Components
import MenuItem from './MenuItem';

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: props.initialEntry || props.entries[0].id,
    }
  }

  _onPress = (id) => {
    this.setState({selectedItem: id});
  }

  render() {
    return (
      <TabBarIOS {...this.props}>
        {this.props.entries.map(entry => (
          <MenuItem
            key={entry.id}
            selected={entry.id === this.state.selectedItem}
            {...entry}
            onPress={this._onPress}>
            {entry.element}
          </MenuItem>
        ))}
      </TabBarIOS>
    )
  }
}

export default Menu;

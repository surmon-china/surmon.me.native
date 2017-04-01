import React, { Component } from 'react';

import { DrawerLayoutAndroid, TouchableNativeFeedback, View } from 'react-native';

// Components
import ListDrawerLayout from './ListDrawerLayout';
import HeaderDrawerLayout from './HeaderDrawerLayout';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: props.initialEntry || props.entries[0].id
    }
  }

  _onSectionChange = (section) => {
    this.setState({selectedItem: section});
    this._drawer.closeDrawer();
  }

  _openMenu = () => {
    this._drawer.openDrawer();
  }

  _renderNavigationView = () => {
    return (
      <View style={this.props.containerStyle}>
        <HeaderDrawerLayout />
        <ListDrawerLayout
          items={this.props.entries}
          selectedItem={this.state.selectedItem}
          tintColor={this.props.tintColor}
          onSectionChange={this._onSectionChange}
        />
      </View>
    )
  }

  _renderContent() {
    const element = this.props.entries.find(entry => entry.id === this.state.selectedItem).element;
    if (element) {
      return React.cloneElement(element, {openMenu: this._openMenu});
    }
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={(ref) => {this._drawer = ref}}
        {...this.props}
        renderNavigationView={this._renderNavigationView}>
        {this._renderContent()}
      </DrawerLayoutAndroid>
    )
  }
}

export default Menu;

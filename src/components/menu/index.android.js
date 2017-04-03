
/*
*
* Android边栏菜单组件
*
*/

import React, { Component } from 'react';
import { DrawerLayoutAndroid, TouchableNativeFeedback, View } from 'react-native';

// Components
import MenuList from './android/menu-list';
import MneuHeader from './android/menu-header';

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
        <MneuHeader userInfo={this.props.userInfo}/>
        <MenuList
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

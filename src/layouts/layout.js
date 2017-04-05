import React, { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Pages
import About from '@app/pages/about';
import Articles from '@app/pages/articles';
import Projects from '@app/pages/projects';

// Components
import Menu from '@app/components/menu';

// Styles
import { AppColors } from '@app/style';

// Service
import { Api } from '@app/service';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userInfo: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    Api.getUserInfo().then(data => {
      this.setState({
        userInfo: data.result,
        loading: false
      });
    }).catch(err => {
      console.log(err);
    });
  }
  
  render() {
    let itemId = 0;
    const androidIconSize = 18;
    const iOSiconSize = 30;
    const navigator = this.props.navigator;
    const userInfo = this.state.userInfo

    return (
      <Menu barTintColor={AppColors.cardBackground} 
            tintColor={AppColors.brand.primary}
            initialEntry={0}
            userInfo={userInfo}
        entries={[
          {
            id: itemId++,
            title: 'Home',
            element: <Articles navigator={navigator} title='SURMON.ME' />,
            androidIcon: <Ionicon name="md-home" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-home-outline',
            selectedIconName: 'ios-home',
            iconSize: iOSiconSize,
            androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null,
          },
          {
            id: itemId++,
            title: 'Projects',
            element: <Projects navigator={navigator} title='My Projects' />,
            androidIcon: <Ionicon name="logo-github" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'logo-github',
            selectedIconName: 'logo-github',
            iconSize: iOSiconSize,
            androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null
          },
          {
            id: itemId++,
            title: 'About Me',
            element: <About navigator={navigator} userInfo={userInfo} title='About Me' />,
            androidIcon: <Ionicon name="md-person" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-person-outline',
            selectedIconName: 'ios-person',
            iconSize: iOSiconSize,
            androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null
          }
        ]}
      />
    )
  }
}

export default Layout;

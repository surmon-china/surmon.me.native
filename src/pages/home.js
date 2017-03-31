import React from 'react';

// 本组件用于封装视图，使其可以正确响应触摸操作（仅限Android平台
import { TouchableNativeFeedback } from 'react-native';

// External Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

// Pages
import About from '@pages/about';
import Archive from '@pages/archive';
import Articles from '@pages/articles';
import Guestbook from '@pages/guestbook';

// Components
import Menu from '@components/menu';

const InitPage = ({navigator}) => {
  let itemId = 0;
  const androidIconSize = 18;
  const iOSiconSize = 30;

  return (
    <Menu barTintColor="white" tintColor="#0d86ff" initialEntry={0}
      entries={[
        {
          id: itemId++,
          title: 'Home',
          element: <Articles navigator={navigator} title='SURMON.ME' />,
          androidIcon: <Icon name="description" size={androidIconSize} />,
          itemComponent: Ionicon.TabBarItem,
          iconName: 'ios-home-outline',
          selectedIconName: 'ios-home',
          iconSize: iOSiconSize,
          androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null,
          badgeColor: 'black'
        },
        {
          id: itemId++,
          title: 'Archive',
          element: <Archive navigator={navigator} title='Archive' />,
          androidIcon: <Icon name="access-time" size={androidIconSize} />,
          itemComponent: Ionicon.TabBarItem,
          iconName: 'ios-archive-outline',
          selectedIconName: 'ios-archive',
          iconSize: iOSiconSize,
          androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null
        },
        {
          id: itemId++,
          title: 'Guestbook',
          element: <Guestbook navigator={navigator} title='Guestbook' />,
          androidIcon: <Icon name="favorite" size={androidIconSize} />,
          itemComponent: Ionicon.TabBarItem,
          iconName: 'ios-chatboxes-outline',
          selectedIconName: 'ios-chatboxes',
          iconSize: iOSiconSize,
          androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null
        },
        {
          id: itemId++,
          title: 'About',
          element: <About navigator={navigator} title='About Me' />,
          androidIcon: <Icon name="grade" size={androidIconSize} />,
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

export default InitPage;

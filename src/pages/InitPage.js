import React from 'react';

import { TouchableNativeFeedback } from 'react-native';

// External Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

// Pages
import NewsPage from './NewsPage';

// Components
import Menu from './../components/Menu';

const InitPage = ({navigator}) => {
  let itemId = 0;
  const androidIconSize = 18;
  const iOSiconSize = 30;

  return (
    <Menu barTintColor="black" tintColor="#eee" initialEntry={0}
      entries={[
        {
          id: itemId++,
          title: 'Home',
          element: <NewsPage navigator={navigator} title='Home' />,
          androidIcon: <Icon name="description" size={androidIconSize} />,
          itemComponent: Ionicon.TabBarItem,
          iconName: 'ios-paper-outline',
          selectedIconName: 'ios-paper',
          iconSize: iOSiconSize,
          androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null,
          badge: 8,
          badgeColor: 'black'
        },
        {
          id: itemId++,
          title: 'News',
          element: <NewsPage navigator={navigator} title='News' />,
          androidIcon: <Icon name="access-time" size={androidIconSize} />,
          itemComponent: Ionicon.TabBarItem,
          iconName: 'ios-time-outline',
          selectedIconName: 'ios-time',
          iconSize: iOSiconSize,
          androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null
        },
        {
          id: itemId++,
          title: 'Favorite',
          element: <NewsPage navigator={navigator} title='Favorite' />,
          androidIcon: <Icon name="favorite" size={androidIconSize} />,
          itemComponent: Ionicon.TabBarItem,
          iconName: 'ios-heart-outline',
          selectedIconName: 'ios-heart',
          iconSize: iOSiconSize,
          androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null
        },
        {
          id: itemId++,
          title: 'Popular',
          element: <NewsPage navigator={navigator} title='Popular' />,
          androidIcon: <Icon name="grade" size={androidIconSize} />,
          itemComponent: Ionicon.TabBarItem,
          iconName: 'ios-star-outline',
          selectedIconName: 'ios-star',
          iconSize: iOSiconSize,
          androidBackground: (TouchableNativeFeedback.Ripple) ? TouchableNativeFeedback.Ripple('grey', false) : null
        }
      ]}
    />
  )
}

export default InitPage;

import React, { Component } from 'react';

import { Navigator } from 'react-native';

// Pages
import InitPage from './pages/InitPage';

const AppContainer = () =>
    <Navigator
      initialRoute={{ component: InitPage }}
      configureScene={ () => Navigator.SceneConfigs.PushFromRight }
      renderScene={ (route, navigator) => {
        let Component = route.component;

        return React.createElement(Component, { ...route.passProps, navigator } )
      } } />

export default AppContainer;

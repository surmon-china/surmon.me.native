
import React, { Component } from 'react';
import { Navigator } from 'react-native';

// init Home
import HomePage from './pages/home';

/*
initialRoute：初始化路由

configureScene: 配置场景动画
- FloatFromBottom
- PushFromRight

renderScene: 渲染场景
使用动态加载组件的方式. 设置加载页面的navigator参数, 其余使用route.passProps属性传递其他参数.
*/

const AppContainer = () =>
    <Navigator  initialRoute={{ component: HomePage }}
                configureScene={ () => Navigator.SceneConfigs.PushFromRight }
                renderScene={ (route, navigator) => {
                  let Component = route.component;
                  return React.createElement(Component, { ...route.passProps, navigator })
                }} 
    />

export default AppContainer;

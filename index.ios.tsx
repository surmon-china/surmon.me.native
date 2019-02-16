/**
 * IOS entry.
 * @file IOS 入口文件
 * @module app/ios
 * @author Surmon <https://github.com/surmon-china>
 */

import { AppRegistry } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { NavigatorStacks, NavigatorBaseOpions } from '@app/index';
import colors from '@app/style/colors';

const appJson = require('./app.json');
const AppNavigator = createBottomTabNavigator(NavigatorStacks, {
  ...NavigatorBaseOpions,
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.textTitle,
    labelStyle: {
      marginTop: -6
    }
  }
  // order -定义选项卡顺序的 routeNames 数组。
  // paths - 提供 routeName 到 path 配置的映射, 它重写 routeConfigs 中设置的路径。
  // backBehavior - 控制 "返回" 按钮是否会导致 Tab 页切换到初始 Tab 页? 如果是, 设置为 initialRoute, 否则 none。 默认为 initialRoute的行为。
  // tabBarComponent -可选，覆盖用作标签栏的组件.
  // tabBarOptions - 具有以下属性的对象:
    // activeTintColor -活动选项卡的标签和图标颜色。
    // activeBackgroundColor -活动选项卡的背景色。
    // inactiveTintColor -"非活动" 选项卡的标签和图标颜色。
    // inactiveBackgroundColor -非活动选项卡的背景色。
    // showLabel -是否显示选项卡的标签, 默认值为 true。
    // showIcon - 是否显示 Tab 的图标，默认为false。
    // style -选项卡栏的样式对象。
    // labelStyle -选项卡标签的样式对象。
    // tabStyle -选项卡的样式对象。
    // allowFontScaling -无论标签字体是否应缩放以尊重文字大小可访问性设置，默认值都是 true。
    // safeAreaInset - 为 <SafeAreaView> 组件重写 forceInset prop， 默认值：{ bottom: 'always', top: 'never' }； top | bottom | left | right 的可选值有： 'always' | 'never'。
});
const AppContainer = createAppContainer(AppNavigator);
AppRegistry.registerComponent(appJson.name, () => AppContainer);


/*
*
* 顶部导航栏组件
*
*/

import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// External Libraries
import Ionicons from 'react-native-vector-icons/Ionicons';

// Styles
import { AppColors, AppSizes } from '@app/style';

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.brand.primary
  },
  statusBar: {
    height: AppSizes.statusBarHeight
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: AppSizes.navbarHeight
  },
  navBarTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitleText: {
    fontWeight: '500',
  },
  navBarButton: {
    justifyContent: 'center',
    marginLeft: AppSizes.padding * 0.75,
    marginRight: AppSizes.padding * 0.75,
  }
});

const NavBar = ({
  leftIsBack,
  navigator,

  title, 
  colorText,
  containerStyle,

  leftOn, 
  leftText, 
  onLeftPress, 
  
  rightOn,
  rightText, 
  onRightPress
}) => {

  // 区分平台
  const isAndroid = Platform.OS === 'android';

  // 如果有自定义的事件，则代表是要执行非返回操作
  leftIsBack = leftIsBack !== undefined ? leftIsBack : !onLeftPress;

  // 是否展示左侧按钮（1、开启展示、2后退操作/非返回操作但在安卓平台）
  const enableLeftMenu = leftOn && (leftIsBack || (!leftIsBack && isAndroid));

  // 默认左侧按钮图标
  let defaultLeftMenuText;

  // 后退操作
  if (leftIsBack) {
    defaultLeftMenuText = isAndroid
    ? <Ionicons name='md-arrow-back' size={24} color={AppColors.textPrimary} />
    : <Ionicons name='ios-arrow-back' size={32} color={AppColors.textPrimary} />

  // 菜单操作
  } else {
    defaultLeftMenuText = isAndroid
    ? <Ionicons name='md-menu' size={24} color={AppColors.textPrimary} />
    : null
  }

  // left menu options
  leftText = leftText || defaultLeftMenuText;
  colorText = colorText || AppColors.textPrimary;
  onLeftPress = onLeftPress || (() => {navigator.pop()});
  containerStyle = containerStyle || {};
  containerStyle.backgroundColor = containerStyle.backgroundColor || AppColors.brand.primary;

  return (
    <View style={[styles.navBarContainer, containerStyle]}>
      <View style={styles.statusBar}>
        <StatusBar
            translucent={true}
            backgroundColor={'#rgba(0, 0, 0, 0.2)'}
            barStyle="light-content"
            showHideTransition='slide'
            style={styles.statusBar}
            hidden={false}
        />
      </View>
      <View style={styles.navBar}>
        <View style={styles.navBarTitleContainer}>
          <Text style={[styles.navBarTitleText, {color: colorText}]}>{ title }</Text>
        </View>

        {
          enableLeftMenu ? <TouchableOpacity
                              onPress={onLeftPress}
                              style={styles.navBarButton}>
                              <Text style={{color: colorText}}>{leftText}</Text>
                           </TouchableOpacity>
                         : null
        }

        {
          rightOn ? <TouchableOpacity
                      onPress={onRightPress}
                      style={styles.navBarButton}>
                      <Text style={{color: colorText}}>{rightText}</Text>
                      </TouchableOpacity>
                    : null
        }
      </View>
    </View>
  )
}

export default NavBar;

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// Style
import { AppColors, AppSizes, AppFonts } from '@app/style';

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: AppSizes.screen.width - 56,
    height: ((AppSizes.screen.width - 56) * 9) / 14,
    backgroundColor: AppColors.brand.primary,
    paddingLeft: 20
  },
  headerGravatar: {
    width: 66,
    height: 66,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: AppColors.cardBackground
  },
  headerText: {
    ...AppFonts.h1,
    color: AppColors.cardBackground,
    marginTop: AppSizes.padding,
    marginBottom: AppSizes.padding / 2,
  },
  secondaryText: {
    ...AppFonts.base,
    color: AppColors.cardBackground,
    marginBottom: AppSizes.padding
  }
});

const MenuHeader = ({ userInfo }) => {
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.headerGravatar}
             source={
        userInfo ? {uri: userInfo.gravatar} : require('@app/images/gravatar.jpg')
      }/>
      <Text style={styles.headerText}>{ userInfo ? userInfo.name : 'Surmon' }</Text>
      <Text style={styles.secondaryText}>{ userInfo ? userInfo.slogan : 'Talk is cheap. Show me the code.' }</Text>
    </View>
  )
}

export default MenuHeader;

import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';

// Style
import { AppColors, AppSizes, AppFonts } from '@app/style';

// Styles
const selectedTextColor = AppColors.textLink;
const selectedBackGroundColor = AppColors.background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 44,
    height: 48,
    marginRight: AppSizes.padding * 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    ...AppFonts.base,
    marginRight: AppSizes.padding * 0.8,
    fontWeight: 'bold'
  }
})

const selectedStyles = StyleSheet.create({
  container: {
    backgroundColor: selectedBackGroundColor,
  },
  iconContainer: {
    backgroundColor: selectedBackGroundColor,
  },
  text: {
    color: selectedTextColor,
  },
});

const MenuItem = (props) => {
  let { isSelected, icon, tintColor } = props,
      textStyles = [styles.text],
      contanierStyles = [styles.container],
      iconContanierStyles = [styles.iconContainer],
      iconElement = icon;

  if (isSelected) {
    if (tintColor) {
      textStyles.push({color: tintColor});
    } else {
      textStyles.push(selectedStyles.text);
    }
    contanierStyles.push(selectedStyles.container);
    iconContanierStyles.push(selectedStyles.iconContainer);
    if (icon) {
      iconElement = React.cloneElement(
        icon,
        {color: props.tintColor || selectedTextColor}
      )
    }
  }

  return (
    <TouchableNativeFeedback
      background={props.background}
      onPress={() => {
        props.onPress(props.id);
      }}>
      <View style={contanierStyles}>
        <View style={iconContanierStyles}>
          {iconElement}
        </View>
        <Text style={textStyles}>
          {props.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  )
}

export default MenuItem;

import React from 'react';

import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';

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
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    marginRight: 16,
    fontSize: 14,
    fontWeight: 'bold',
  }
})

const selectedTextColor = '#009688';
const selectedBackGroundColor = '#EEEEEE';

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

export default MenuItem;


/*
*
* 封装兼容的Loading组件
*
*/

import React, { Component } from 'react';
import { ActivityIndicator, Platform } from 'react-native';

// Styles
import { AppColors } from '@app/style';

class AutoActivityIndicator extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<ActivityIndicator size={this.props.size || 'large'} 
                         style={this.props.style}
    										 color={ 
    										 		Platform.OS === 'ios'
    										 		? AppColors.brand.secondary 
    										 		: AppColors.brand.primary
    										 	}/>
    )
  }
}

export default AutoActivityIndicator;
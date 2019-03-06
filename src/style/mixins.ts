
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  // 垂直分布，全部居中
  colCenter: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  // 水平分布，垂直居中
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

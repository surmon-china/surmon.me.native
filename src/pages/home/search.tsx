
import React, { Component } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { SafeAreaView, TextInput, TouchableOpacity, ListView, StyleSheet, View } from 'react-native'
import { boundMethod } from 'autobind-decorator'
import { Text } from '@app/components/common/text'
import { IPageProps } from '@app/types/props'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import mixins from '@app/style/mixins'

interface IProps extends IPageProps {}

@observer export class ArticleSearch extends Component<IProps> {

  static navigationOptions = {
    header: null
  }

  constructor(props: IProps) {
    super(props)
  }
  
  @observable.ref private keyword: string = ''

  @action.bound handleInputChange(keyword: string) {
    this.keyword = keyword
  }

  @boundMethod handleInputSubmit() {
    if (this.keyword) {
      console.log('跳转到首页，启用搜索')
    }
  }

  @boundMethod handleGoBack() {
    this.props.navigation.goBack(null)
  }

  render() {
    const { styles } = obStyles
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TextInput
              style={styles.input}
              value={this.keyword}
              autoFocus={true}
              maxLength={30}
              placeholder={"搜索内容"}
              returnKeyType="search"
              // placeholderTextColor
              clearButtonMode="while-editing"
              onChangeText={this.handleInputChange}
              onSubmitEditing={this.handleInputSubmit}
            />
            <TouchableOpacity style={styles.search} onPress={this.handleGoBack}>
              <Text style={styles.searchText}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        padding: sizes.goldenRatioGap
      },
      header: {
        ...mixins.rowCenter,
        justifyContent: 'space-between'
      },
      input: {
        height: 35,
        width: '85%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: colors.background
      },
      search: {
        width: '10%',
      },
      searchText: {
        color: colors.primary
      }
    })
  }
})

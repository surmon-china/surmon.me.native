
import React, { Component } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { boundMethod } from 'autobind-decorator'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { SafeAreaView, TextInput, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@app/components/common/text'
import { archiveFilterStore, EFilterType } from '@app/components/archive/filter'
import { IPageProps } from '@app/types/props'
import storage from '@app/services/storage'
import { STORAGE } from '@app/constants/storage'
import mixins from '@app/style/mixins'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

interface IProps extends IPageProps {}

@observer export class ArticleSearch extends Component<IProps> {

  static navigationOptions = {
    header: null
  }

  constructor(props: IProps) {
    super(props)
    this.initAndResetHistory()
    this.initAndResetKeyword()
  }
  
  @observable.ref private keyword: string = ''
  @observable.ref private historys: string[] = []

  initAndResetKeyword() {
    if (archiveFilterStore.activeType === EFilterType.Search) {
      this.updateKeyword(archiveFilterStore.filterValue || '')
    }
  }

  @boundMethod initAndResetHistory() {
    storage.get<string[]>(STORAGE.SEARCH_HISTORY).then(this.updateHistorys)
  }

  @boundMethod updateHistoryStorage() {
    storage.set(STORAGE.SEARCH_HISTORY, this.historys)
  }

  @boundMethod clearHisrory() {
    storage.remove(STORAGE.SEARCH_HISTORY).then(this.initAndResetHistory)
  }

  @action.bound updateHistorys(historys: string[]) {
    this.historys = historys || []
  }

  @action.bound updateKeyword(keyword: string) {
    this.keyword = keyword
  }

  @boundMethod handleGoBack() {
    this.props.navigation.goBack(null)
  }

  @boundMethod submitSearch() {
    if (this.keyword) {
      let historys = this.historys.slice()
      historys.unshift(this.keyword)
      historys = Array.from(new Set(historys)).slice(0, 13)
      this.updateHistorys(historys)
      this.updateHistoryStorage()
      archiveFilterStore.updateActiveFilter(EFilterType.Search, this.keyword)
      this.handleGoBack()
    }
  }

  @boundMethod handlePressHistory(history: string) {
    this.updateKeyword(history)
    this.submitSearch()
  }

  @boundMethod handleRemoveHistoryItem(index: number) {
    const historys = this.historys.slice()
    historys.splice(index, 1)
    this.updateHistorys(historys)
    this.updateHistoryStorage()
  }

  @computed get historyView(): JSX.Element | null {
    if (!this.historys || !this.historys.length) {
      return null
    }

    const { styles } = obStyles
    return (
      <>
        <View style={styles.title}>
          <Text style={fonts.h5}>搜索历史</Text>
          <TouchableOpacity onPress={this.clearHisrory}>
            <Text style={fonts.small}>清空</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.historys}>
          {this.historys.map((keyword, index) => (
            <View key={keyword} style={styles.historyItem}>
              <TouchableOpacity
                style={styles.historyKeyword}
                activeOpacity={sizes.touchOpacity}
                onPress={() => this.handlePressHistory(keyword)}
              >
                <Ionicon name="ios-time" size={16} style={styles.historyIcon} />
                <Text>{keyword}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={sizes.touchOpacity}
                onPress={() => this.handleRemoveHistoryItem(index)}
              >
                <Ionicon name="ios-close" size={21} style={styles.historyIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </>
    )
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
              onChangeText={this.updateKeyword}
              onSubmitEditing={this.submitSearch}
            />
            <TouchableOpacity style={styles.search} onPress={this.handleGoBack}>
              <Text style={styles.searchText}>取消</Text>
            </TouchableOpacity>
          </View>
          {this.historyView}
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
      },
      title: {
        ...mixins.rowCenter,
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 5
      },
      historys: {
        flex: 1
      },
      historyItem: {
        ...mixins.rowCenter,
        justifyContent: 'space-between',
        height: sizes.gap * 2,
        borderBottomWidth: sizes.borderWidth,
        borderColor: colors.border
      },
      historyKeyword: {
        ...mixins.rowCenter,
      },
      historyIcon: {
        marginHorizontal: 8,
        color: colors.border
      }
    })
  }
})

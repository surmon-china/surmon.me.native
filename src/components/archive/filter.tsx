
import React, { Component } from 'react'
import { NavigationContainerProps, NavigationScreenConfigProps } from "react-navigation"
import { Alert, BackHandler, Button, ListView, Platform, StyleSheet, Text, View } from 'react-native'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react/native'
import { boundMethod } from 'autobind-decorator'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { ArticleList } from '@app/components/archive/list'
import { ICategory, ITag } from '@app/types/business'
import colors from '@app/style/colors'
import i18n from '@app/services/i18n'
import * as sizes from '@app/style/sizes'
import * as ACTION from '@app/constants/action'
import * as LANGUAGE from '@app/constants/language'

type TActiveFilter = ITag | ICategory | string | null

class ArchiveFilterStore {

  constructor() {
    this.fetchTags()
    this.fetchCategories()
  }

  @observable.ref tags: ITag[] = []
  @observable.ref categories: ICategory[] = []
  @observable.ref isVisible: boolean = false
  @observable.ref activeFilter: TActiveFilter = 'null'

  @action.bound toggleVisibleState() {
    this.isVisible = !this.isVisible
  }
  
  @action updateActiveFilter(activeFilter: TActiveFilter) {
    this.activeFilter = activeFilter
  }
  
  @action private updateTags(tags: ITag[]) {
    this.tags = tags
  }
  
  @action private updateCategories(categories: ICategory[]) {
    this.categories = categories
  }

  fetchTags() {}
  fetchCategories() {}
}

export const archiveFilterStore = new ArchiveFilterStore()

interface IProps extends NavigationContainerProps {}

@observer export class ArchiveFilter extends Component<IProps> {

  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <Text>一堆的标签和列表</Text>
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
      }
    })
  }
})


import React, { Component } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react/native'
import { Text } from '@app/components/common/text'
import { BetterModal } from '@app/components/common/modal'
import { ICategory, ITag } from '@app/types/business'
import { IHttpResultPaginate } from '@app/types/http'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { ValueOf } from '@app/utils/transform'
import mixins, { getHeaderButtonStyle } from '@app/style/mixins'
import sizes, { defaultHeaderHeight } from '@app/style/sizes'
import colors from '@app/style/colors'
import i18n from '@app/services/i18n'
import fonts from '@app/style/fonts'
import fetch from '@app/services/fetch'

export enum EFilterType {
  Tag = 'Tag',
  Category = 'Category',
  Search = 'Search'
}

export const filterTypeTextMap: Record<ValueOf<typeof EFilterType>, string> = {
  [EFilterType.Tag]: '标签',
  [EFilterType.Category]: '分类',
  [EFilterType.Search]: '关键词'
}

export interface IActiveFilter {
  [EFilterType.Tag]: ITag | null
  [EFilterType.Category]: ICategory | null
  [EFilterType.Search]: string | null
}

type TFilterValue = ITag | ICategory | string

class Store {

  constructor() {
    this.fetchTags()
    this.fetchCategories()
  }

  @observable.ref tags: ITag[] = []
  @observable.ref categories: ICategory[] = []

  @observable activeType: EFilterType | null = null // 是否选中 & 选中的类型
  @observable activeValues: IActiveFilter = { // 各种条件值
    [EFilterType.Tag]: null,
    [EFilterType.Category]: null,
    [EFilterType.Search]: null
  }

  @observable modalVisible: boolean = false
  @observable isLoadingTags: boolean = false
  @observable isLoadingCategories: boolean = false

  @computed get hasFilter(): boolean {
    return (
      this.activeType !== null &&
      [EFilterType.Tag, EFilterType.Category].indexOf(this.activeType) > -1
    )
  }

  @computed get filterValue(): string | null {
    if (!this.activeType) {
      return null
    }
    return this.hasFilter
      ? (this.activeValues[this.activeType] as ICategory | ITag).slug
      : (this.activeValues[this.activeType] as string)
  }

  @computed get filterValueText(): string | null {
    if (!this.activeType) {
      return null
    }
    return this.hasFilter
      ? (this.activeValues[this.activeType] as ICategory | ITag).name
      : (this.activeValues[this.activeType] as string)
  }
  
  @action updateActiveFilter(type: EFilterType, value: TFilterValue) {
    this.activeType = type
    this.activeValues[type] = value
  }

  @action.bound clearActiveFilter() {
    this.activeType = null
  }

  @action.bound updateVisibleState(visible: boolean) {
    this.modalVisible = visible
  }
  
  @action private updateTags(tags: ITag[]) {
    this.tags = tags
  }
  
  @action private updateCategories(categories: ICategory[]) {
    this.categories = categories
  }
  
  @action private updateTagsLoadingState(loading: boolean) {
    this.isLoadingTags = loading
  }
  
  @action private updateCategoriesLoadingState(loading: boolean) {
    this.isLoadingCategories = loading
  }

  fetchTags() {
    this.updateTagsLoadingState(true)
    return fetch.get<IHttpResultPaginate<ITag[]>>('/tag', { per_page: 666 })
      .then(({ result }) => {
        this.updateTagsLoadingState(false)
        this.updateTags(result.data)
      })
      .catch(error => {
        this.updateTagsLoadingState(false)
        console.warn('Fetch tags error:', error)
        return Promise.reject(error)
      })
  }

  fetchCategories() {
    this.updateCategoriesLoadingState(true)
    return fetch.get<IHttpResultPaginate<ICategory[]>>('/category')
      .then(({ result }) => {
        this.updateCategoriesLoadingState(false)
        this.updateCategories(result.data)
      })
      .catch(error => {
        this.updateCategoriesLoadingState(false)
        console.warn('Fetch categories error:', error)
        return Promise.reject(error)
      })
  }
}

const store = new Store()
export const archiveFilterStore = store

interface IProps {}
@observer export class ArchiveFilter extends Component<IProps> {

  constructor(props: IProps) {
    super(props)
  }

  @computed get filterList() {
    return [
      {
        name: '分类',
        type: EFilterType.Category,
        data: store.categories
      },
      {
        name: '标签',
        type: EFilterType.Tag,
        data: store.tags
      }
    ]
  }

  render() {
    const { styles } = obStyles
    return (
      <BetterModal
        top={defaultHeaderHeight}
        title="使用标签、分类进行过滤"
        visible={store.modalVisible}
        onClose={() => store.updateVisibleState(false)}
        extra={
          <TouchableOpacity
            activeOpacity={sizes.touchOpacity}
            onPress={() => {
              store.clearActiveFilter()
              store.updateVisibleState(false)
            }}
          >
            <Ionicon name="ios-remove" {...getHeaderButtonStyle()} />
          </TouchableOpacity>
        }
      >
        <ScrollView style={styles.container}>
          {this.filterList.map(filter => (
            <View key={filter.type}>
              <Text style={fonts.h4}>{filter.name}</Text>
              <View style={styles.list}>
                {filter.data.map(item => {
                  const isActiveType = store.activeType === filter.type
                  const isActiveValue = store.filterValue === item.slug
                  const isActiveFilter = isActiveType && isActiveValue
                  return (
                    <TouchableOpacity
                      key={item._id}
                      activeOpacity={sizes.touchOpacity}
                      style={[styles.item, isActiveFilter ? styles.itemActive : null]}
                      onPress={() => {
                        store.updateActiveFilter(filter.type, item)
                        store.updateVisibleState(false)
                      }}
                    >
                      <Text style={[fonts.small, isActiveFilter ? styles.itemActiveText : null]}>{item.name}</Text>
                      {isActiveFilter && (
                        <Ionicon
                          name="ios-checkmark"
                          size={fonts.h4.fontSize}
                          style={[styles.itemIcon, isActiveFilter ? styles.itemActiveText : null]}
                        />
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </BetterModal>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      modal: {
        justifyContent: "flex-end",
        margin: 0
      },
      container: {
        flex: 1,
        padding: sizes.gap
      },
      header: {
        height: 30,
        borderColor: colors.border,
        borderBottomWidth: sizes.borderWidth
      },
      list: {
        ...mixins.rowCenter,
        flexWrap: 'wrap',
        marginVertical: sizes.gap
      },
      item: {
        ...mixins.rowCenter,
        paddingHorizontal: sizes.goldenRatioGap,
        paddingVertical: sizes.goldenRatioGap / 2,
        backgroundColor: colors.background,
        marginRight: sizes.goldenRatioGap,
        marginBottom: sizes.goldenRatioGap
      },
      itemActive: {
        backgroundColor: colors.primary
      },
      itemActiveText: {
        color: colors.background
      },
      itemIcon: {
        marginLeft: 8
      }
    })
  }
})

/**
 * App article filter component.
 * @file 文章过滤器组件
 * @module app/components/archive/filter
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { optionStore } from '@app/stores/option'
import { Text } from '@app/components/common/text'
import { BetterModal } from '@app/components/common/modal'
import { TouchableView } from '@app/components/common/touchable-view'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { ICategory, ITag } from '@app/types/business'
import { IHttpResultPaginate } from '@app/types/http'
import { ValueOf } from '@app/utils/transform'
import i18n from '@app/services/i18n'
import fetch from '@app/services/fetch'
import mixins, { getHeaderButtonStyle } from '@app/style/mixins'
import sizes, { defaultHeaderHeight } from '@app/style/sizes'
import fonts from '@app/style/fonts'
import colors from '@app/style/colors'

export enum EFilterType {
  Tag = 'Tag',
  Category = 'Category',
  Search = 'Search'
}

export interface IFilterValues {
  [EFilterType.Tag]: ITag | null
  [EFilterType.Category]: ICategory | null
  [EFilterType.Search]: string | null
}

export type TFilterValue = ITag | ICategory | string

class Store {

  constructor() {
    this.fetchTags()
    this.fetchCategories()
  }

  @observable filterActive: boolean = false // 是否激活
  @observable filterType: EFilterType = EFilterType.Category // 激活的类型
  @observable filterValues: IFilterValues = {
    [EFilterType.Tag]: null,
    [EFilterType.Category]: null,
    [EFilterType.Search]: null
  }

  @observable.ref tags: ITag[] = []
  @observable.ref categories: ICategory[] = []
  @observable modalVisible: boolean = false

  // 是否拥有文章或分类过滤条件
  @computed
  get isActiveTagOrCategoryFilter(): boolean {
    return (
      this.filterActive &&
      [EFilterType.Tag, EFilterType.Category].includes(this.filterType)
    )
  }

  // 过滤条件类型文案
  @computed
  get filterTypeText(): string {
    const typeTextMap: Record<ValueOf<typeof EFilterType>, string> = {
      [EFilterType.Tag]: i18n.t(LANGUAGE_KEYS.TAG),
      [EFilterType.Category]: i18n.t(LANGUAGE_KEYS.CATEGORY),
      [EFilterType.Search]: i18n.t(LANGUAGE_KEYS.SEARCH)
    }
    return typeTextMap[this.filterType]
  }

  // 当前过滤条件的值
  @computed
  get filterValue(): TFilterValue | void {
    if (this.filterType === EFilterType.Search) {
      return this.filterValues[EFilterType.Search] as string
    }
    if (this.filterType === EFilterType.Tag) {
      return this.filterValues[EFilterType.Tag] as ITag
    }
    if (this.filterType === EFilterType.Category) {
      return this.filterValues[EFilterType.Category] as ICategory
    }
  }
  
  @action.bound
  updateActiveFilter(type: EFilterType, value: TFilterValue) {
    this.filterType = type
    this.filterValues[type] = value
    this.filterActive = true
  }

  @action.bound
  clearActiveFilter() {
    this.filterActive = false
  }

  @action.bound
  updateVisibleState(visible: boolean) {
    this.modalVisible = visible
  }
  
  private fetchTags() {
    return fetch.get<IHttpResultPaginate<ITag[]>>('/tag', { per_page: 666 })
      .then(
        action((result: any) => {
          this.tags = result.result.data
        })
      )
  }

  private fetchCategories() {
    return fetch.get<IHttpResultPaginate<ICategory[]>>('/category')
      .then(
        action((result: any) => {
          this.categories = result.result.data
        })
      )
  }
}

export const archiveFilterStore = new Store()
export interface IArchiveFilterProps {}

@observer
export class ArchiveFilter extends Component<IArchiveFilterProps> {

  constructor(props: IArchiveFilterProps) {
    super(props)
  }

  @computed
  private get scrollFilterListView(): JSX.Element {

    const { styles } = obStyles
    const filters = [
      {
        name: i18n.t(LANGUAGE_KEYS.CATEGORIES),
        type: EFilterType.Category,
        data: archiveFilterStore.categories
      },
      {
        name: i18n.t(LANGUAGE_KEYS.TAGS),
        type: EFilterType.Tag,
        data: archiveFilterStore.tags
      }
    ]

    return (
      <ScrollView style={styles.container}>
        {filters.map(filter => (
          <View key={filter.type}>
            <Text style={fonts.h4}>{filter.name}</Text>
            <View style={styles.list}>
              {filter.data.map(item => {
                const { filterActive: isFilterActive, filterType, filterValues } = archiveFilterStore
                const activeValue = filterValues[filterType] as ICategory
                const isActive = (
                  isFilterActive &&
                  filterType === filter.type && 
                  activeValue &&
                  activeValue.slug === item.slug
                )
                return (
                  <TouchableView
                    key={item._id}
                    style={[
                      styles.item,
                      isActive ? styles.itemActive : null
                    ]}
                    onPress={() => {
                      archiveFilterStore.updateActiveFilter(filter.type, item)
                      archiveFilterStore.updateVisibleState(false)
                    }}
                  >
                    <Text
                      style={[
                        { fontSize: fonts.base.fontSize * 0.9, textTransform: 'capitalize' },
                        isActive ? styles.itemActiveText : null
                      ]}
                    >
                      {optionStore.isEnLang ? item.slug : item.name}
                    </Text>
                    {isActive && (
                      <Ionicon
                        name="ios-checkmark"
                        size={fonts.h2.fontSize}
                        style={[
                          styles.itemIcon,
                          isActive ? styles.itemActiveText : null
                        ]}
                      />
                    )}
                  </TouchableView>
                )
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    )
  }

  render() {
    return (
      <BetterModal
        top={defaultHeaderHeight}
        title={i18n.t(LANGUAGE_KEYS.FILTER_BY_TAG_CATEGORY)}
        visible={archiveFilterStore.modalVisible}
        onClose={() => archiveFilterStore.updateVisibleState(false)}
        extra={
          <TouchableView
            onPress={() => {
              archiveFilterStore.clearActiveFilter()
              archiveFilterStore.updateVisibleState(false)
            }}
          >
            <Ionicon name="ios-remove" {...getHeaderButtonStyle()} />
          </TouchableView>
        }
      >
        {this.scrollFilterListView}
      </BetterModal>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      modal: {
        justifyContent: 'flex-end',
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
        height: 32,
        paddingHorizontal: sizes.goldenRatioGap,
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

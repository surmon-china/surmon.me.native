/**
 * Common Prop types
 * @file 公共 Prop 模型
 * @module types/props
 * @author Surmon <https://github.com/surmon-china>
 */

import { Route } from '@react-navigation/native'

export interface Navigation {
  addListener(...addListener: any): any
  canGoBack(...canGoBack: any): any
  dangerouslyGetParent(...dangerouslyGetParent: any): any
  dangerouslyGetState(...anonymous: any): any
  dispatch(...dispatch: any): any
  goBack(...anonymous: any): any
  isFocused(...isFocused: any): any
  jumpTo(...anonymous: any): any
  navigate(...anonymous: any): any
  pop(...anonymous: any): any
  popToTop(...anonymous: any): any
  push(...anonymous: any): any
  removeListener(...removeListener: any): any
  replace(...anonymous: any): any
  reset(...anonymous: any): any
  setOptions(...setOptions: any): any
  setParams(...anonymou: any): any
}

export interface NavigationProps {
  navigation: Navigation
  route: Route<string> & {
    params: any
  }
}

export interface IPageProps extends NavigationProps {}

export interface IChildrenProps {
  children: React.ReactNode | React.ReactNode[]
}

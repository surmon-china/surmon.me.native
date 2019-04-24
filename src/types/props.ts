
import { NavigationScreenProp, NavigationNavigateActionPayload } from 'react-navigation'
import { IGlobalStore } from '@app/stores/global'

export type TNavigation = NavigationScreenProp<NavigationNavigateActionPayload>

export interface INavigationProps {
  navigation: TNavigation
}

export interface IPageProps extends INavigationProps {
  screenProps: IGlobalStore
}

export interface IChildrenProps {
  children: React.ReactNode | React.ReactNode[]
}

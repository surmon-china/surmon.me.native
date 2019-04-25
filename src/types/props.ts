
import { NavigationScreenProp, NavigationNavigateActionPayload } from 'react-navigation'
import { IOptionStore } from '@app/stores/option'

export type TNavigation = NavigationScreenProp<NavigationNavigateActionPayload>

export interface INavigationProps {
  navigation: TNavigation
}

export interface IPageProps extends INavigationProps {
  screenProps: IOptionStore
}

export interface IChildrenProps {
  children: React.ReactNode | React.ReactNode[]
}

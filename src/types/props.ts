
import { NavigationContainerProps } from "react-navigation"
import { IGlobalStore } from "@app/stores/global"

export interface IComponentProps extends NavigationContainerProps {
  screenProps: IGlobalStore
}


import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import { StyleSheet, Text } from 'react-native'
import { DoubleClick } from '@app/components/common/double-click'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'

interface IProps {
  onDoubleClick?(): void
  title?: string
}

export const CustomHeader = observer((props: IProps): JSX.Element => {
  const { title, onDoubleClick } = props
  const { styles } = headerStyles

  function handleClick() {
    onDoubleClick && onDoubleClick()
  }

  return (
    <DoubleClick onDoubleClick={handleClick}>
      <Text style={styles.title}>{title}</Text>
    </DoubleClick>
  )
})

export const headerStyles = observable({
  get styles() {
    return StyleSheet.create({
      title: {
        ...fonts.h3,
        color: colors.cardBackground
      }
    })
  }
})

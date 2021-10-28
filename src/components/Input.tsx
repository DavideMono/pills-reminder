import React, { VFC } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { BACKGROUND_COLOR, BORDER_RADIUS, LIGHT_COLOR } from 'src/lib/constant'

type Props = {
  value: string
  onChange: (nextValue: string) => void
  placeholder?: string
}

const Input: VFC<Props> = (props) => {
  return (
    <TextInput style={styles.input} value={props.value} onChangeText={props.onChange} placeholder={props.placeholder} />
  )
}

const PADDING_X = 16
const PADDING_Y = 8

const styles = StyleSheet.create({
  input: {
    paddingTop: PADDING_Y,
    paddingBottom: PADDING_Y,
    paddingLeft: PADDING_X,
    paddingRight: PADDING_X,
    backgroundColor: BACKGROUND_COLOR,
    color: LIGHT_COLOR,
    borderRadius: BORDER_RADIUS
  }
})

export default Input

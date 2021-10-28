import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { BACKGROUND_COLOR, BORDER_RADIUS } from 'src/lib/constant'

type Props = {
  onPress: () => void
}

const Button: FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress} activeOpacity={0.8}>
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS
  }
})

export default Button

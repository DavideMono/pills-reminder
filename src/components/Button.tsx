import React, { useMemo, VFC } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { BACKGROUND_COLOR, BORDER_RADIUS, PRIMARY, SECONDARY } from 'src/lib/constant'

type Props = {
  text: string
  onPress: () => void
  color?: 'primary' | 'secondary' | 'default'
  style?: StyleProp<ViewStyle>
}

const Button: VFC<Props> = ({ color = 'default', ...props }) => {
  const style = useMemo<StyleProp<ViewStyle>>(() => {
    const defaultStyle: StyleProp<ViewStyle> = [styles.button]
    if (color === 'primary') {
      defaultStyle.push(styles.buttonPrimary)
    }
    if (color === 'secondary') {
      defaultStyle.push(styles.buttonSecondary)
    }
    return [...defaultStyle, props.style]
  }, [color, props.style])

  const textStyle = useMemo<StyleProp<TextStyle>>(() => {
    if (color === 'primary') {
      return styles.buttonPrimaryText
    }
    return []
  }, [color])

  return (
    <TouchableOpacity style={style} onPress={props.onPress} activeOpacity={0.8}>
      <Text style={textStyle}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS
  },
  buttonPrimary: {
    backgroundColor: PRIMARY
  },
  buttonPrimaryText: {
    color: '#FFFFFF'
  },
  buttonSecondary: {
    backgroundColor: SECONDARY
  }
})

export default Button

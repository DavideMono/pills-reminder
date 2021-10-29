import React, { useMemo, VFC } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import {
  BACKGROUND_COLOR,
  BACKGROUND_PRIMARY,
  BACKGROUND_SECONDARY,
  BORDER_RADIUS,
  LIGHT_COLOR,
  PRIMARY,
  SECONDARY
} from 'src/lib/constant'
import { ThemeColor, ThemeVariant } from 'src/lib/types'
import { capitalize } from 'src/lib/utils'

type Props = {
  text: string
  onPress: () => void
  color?: ThemeColor
  variant?: ThemeVariant
  styleRoot?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
}

const Button: VFC<Props> = ({ color = 'default', variant = 'text', ...props }) => {
  const styleMatcher = useMemo(() => `${color}${capitalize(variant)}`, [color, variant])

  const style = useMemo<StyleProp<ViewStyle>>(() => {
    const defaultStyle: StyleProp<ViewStyle> = [styles.button]
    const selector = styleMatcher as keyof typeof buttonContainerStyle
    defaultStyle.push(buttonContainerStyle[selector], props.styleRoot)
    return defaultStyle
  }, [styleMatcher, props.styleRoot])

  const textStyle = useMemo<StyleProp<TextStyle>>(() => {
    const defaultStyle: StyleProp<TextStyle> = []
    const selector = styleMatcher as keyof typeof buttonTextStyle
    defaultStyle.push(buttonTextStyle[selector], props.styleText)
    return defaultStyle
  }, [styleMatcher, props.styleText])

  return (
    <TouchableOpacity style={style} onPress={props.onPress} activeOpacity={0.6}>
      <Text style={textStyle}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const buttonContainerStyle = StyleSheet.create({
  defaultText: {
    backgroundColor: BACKGROUND_COLOR
  },
  defaultContained: {},
  primaryText: {
    backgroundColor: PRIMARY
  },
  primaryContained: {
    backgroundColor: BACKGROUND_PRIMARY
  },
  secondaryText: {
    backgroundColor: SECONDARY
  },
  secondaryContained: {
    backgroundColor: BACKGROUND_SECONDARY
  }
})

const buttonTextStyle = StyleSheet.create({
  defaultText: {},
  defaultContained: {
    color: LIGHT_COLOR
  },
  primaryText: {
    color: '#FFFFFF'
  },
  primaryContained: {
    color: PRIMARY
  },
  secondaryText: {
    color: '#FFFFFF'
  },
  secondaryContained: {
    color: SECONDARY
  }
})

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: BORDER_RADIUS
  }
})

export default Button

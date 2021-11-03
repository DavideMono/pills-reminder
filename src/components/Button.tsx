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
  size?: 'sm' | 'md' | 'lg' | 'xl'
  styleRoot?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
}

const Button: VFC<Props> = ({ color = 'default', variant = 'text', size = 'md', ...props }) => {
  const styleMatcher = useMemo(() => `${color}${capitalize(variant)}`, [color, variant])

  const style = useMemo<StyleProp<ViewStyle>>(() => {
    const defaultStyle: StyleProp<ViewStyle> = [styles.button]
    const selector = styleMatcher as keyof typeof buttonContainerStyle
    const sizeSelector = ('button' + capitalize(size)) as keyof typeof styles
    defaultStyle.push(buttonContainerStyle[selector], styles[sizeSelector], props.styleRoot)
    return defaultStyle
  }, [styleMatcher, size, props.styleRoot])

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
    borderRadius: BORDER_RADIUS
  },
  buttonSm: {
    padding: 4
  },
  buttonMd: {
    padding: 8
  },
  buttonLg: {
    padding: 14
  },
  buttonXl: {
    padding: 16
  }
})

export default Button

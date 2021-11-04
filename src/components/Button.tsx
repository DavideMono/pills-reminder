import React, { useMemo, VFC } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { FontAwesomeIcon, FontAwesomeIconStyle, Props as IconProps } from '@fortawesome/react-native-fontawesome'
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

type ContentProps =
  | { leftIcon: IconProps['icon']; text?: never }
  | { leftIcon?: never; text: string }
  | { leftIcon: IconProps['icon']; text: string }

type Props = {
  onPress: () => void
  color?: ThemeColor
  variant?: ThemeVariant
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'big'
  rightIcon?: IconProps['icon']
  styleRoot?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
} & ContentProps

const Button: VFC<Props> = ({ color = 'default', variant = 'contained', size = 'md', ...props }) => {
  const styleMatcher = useMemo(() => `${color}${capitalize(variant)}`, [color, variant])

  const style = useMemo<StyleProp<ViewStyle>>(() => {
    const defaultStyle: StyleProp<ViewStyle> = [styles.button]
    const selector = styleMatcher as keyof typeof buttonContainerStyle
    const sizeSelector = `button${capitalize(size)}` as keyof typeof styles
    defaultStyle.push(buttonContainerStyle[selector], styles[sizeSelector], props.styleRoot)
    return defaultStyle
  }, [styleMatcher, size, props.styleRoot])

  const colorStyle = useMemo<FontAwesomeIconStyle>(() => {
    const selector = styleMatcher as keyof typeof buttonTextStyle
    return buttonTextStyle[selector]
  }, [styleMatcher])

  const textStyle = useMemo<StyleProp<TextStyle>>(() => {
    const defaultStyle: StyleProp<TextStyle> = []
    defaultStyle.push(colorStyle, props.styleText)
    return defaultStyle
  }, [colorStyle, props.styleText])

  return (
    <TouchableOpacity style={style} onPress={props.onPress} activeOpacity={0.6}>
      {props.leftIcon && <FontAwesomeIcon style={colorStyle} icon={props.leftIcon} />}
      {props.text && <Text style={textStyle}>{props.text}</Text>}
      {props.rightIcon && <FontAwesomeIcon style={colorStyle} icon={props.rightIcon} />}
    </TouchableOpacity>
  )
}

const buttonContainerStyle = StyleSheet.create({
  defaultText: {},
  defaultContained: {
    backgroundColor: BACKGROUND_COLOR
  },
  primaryText: {
    backgroundColor: BACKGROUND_PRIMARY
  },
  primaryContained: {
    backgroundColor: PRIMARY
  },
  secondaryText: {
    backgroundColor: BACKGROUND_SECONDARY
  },
  secondaryContained: {
    backgroundColor: SECONDARY
  }
})

const buttonTextStyle = StyleSheet.create({
  defaultText: {
    color: LIGHT_COLOR
  },
  defaultContained: {},
  primaryText: {
    color: PRIMARY
  },
  primaryContained: {
    color: '#FFFFFF'
  },
  secondaryText: {
    color: SECONDARY
  },
  secondaryContained: {
    color: '#FFFFFF'
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
  },
  buttonBig: {
    padding: 24
  }
})

export default Button

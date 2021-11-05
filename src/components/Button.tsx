import React, { useMemo, VFC } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
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
  disabled?: boolean
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
    const sizeSelector = `button${capitalize(size)}` as keyof typeof sizeStyles
    defaultStyle.push(
      buttonContainerStyle[selector],
      sizeStyles[sizeSelector],
      props.styleRoot,
      props.disabled && styles.buttonDisabled
    )
    return defaultStyle
  }, [styleMatcher, size, props.disabled, props.styleRoot])

  const colorStyle = useMemo<FontAwesomeIconStyle>(() => {
    const selector = styleMatcher as keyof typeof buttonTextStyle
    return buttonTextStyle[selector]
  }, [styleMatcher])

  const textStyle = useMemo<StyleProp<TextStyle>>(() => {
    const defaultStyle: StyleProp<TextStyle> = []
    defaultStyle.push(colorStyle, props.styleText, !!props.leftIcon && styles.textSpacer)
    return defaultStyle
  }, [colorStyle, props.styleText, props.leftIcon])

  return (
    <TouchableOpacity style={style} onPress={props.onPress} activeOpacity={0.6} disabled={props.disabled}>
      {props.leftIcon && <FontAwesomeIcon style={colorStyle} icon={props.leftIcon} />}
      {props.text && <Text style={textStyle}>{props.text}</Text>}
      {props.rightIcon && <View style={styles.buttonSpacer} />}
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

const sizeStyles = StyleSheet.create({
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

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS
  },
  buttonSpacer: { flex: 1 },
  buttonDisabled: { opacity: 0.6 },
  textSpacer: { marginLeft: 8 }
})

export default Button

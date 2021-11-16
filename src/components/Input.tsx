import React, { useMemo, VFC } from 'react'
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native'
import { FontAwesomeIcon, FontAwesomeIconStyle, Props as IconProps } from '@fortawesome/react-native-fontawesome'
import { BACKGROUND_COLOR, BORDER_RADIUS, LIGHT_COLOR } from 'src/lib/constant'

type Props = {
  value: string
  onChange: (nextValue: string) => void
  disabled?: boolean
  keyboardType?: KeyboardTypeOptions
  placeholder?: string
  leftIcon?: IconProps['icon']
  rightIcon?: IconProps['icon']
  iconStyle?: FontAwesomeIconStyle
  style?: StyleProp<TextStyle>
}

const Input: VFC<Props> = (props) => {
  const rootStyle = useMemo(() => {
    const defaultStyle: StyleProp<ViewStyle> = [styles.root]
    if (props.leftIcon) defaultStyle.push(styles.leftRootSpacer)
    if (props.rightIcon) defaultStyle.push(styles.rightRootSpacer)
    defaultStyle.push(props.style)
    return defaultStyle
  }, [props.leftIcon, props.rightIcon, props.style])

  const inputStyle = useMemo(() => {
    const defaultStyle: StyleProp<TextStyle> = [styles.input]
    if (props.leftIcon) defaultStyle.push(styles.leftSpacer)
    if (props.rightIcon) defaultStyle.push(styles.rightSpacer)
    return defaultStyle
  }, [props.leftIcon, props.rightIcon])

  return (
    <View style={rootStyle}>
      {props.leftIcon && <FontAwesomeIcon style={props.iconStyle} icon={props.leftIcon} />}
      <TextInput
        style={inputStyle}
        value={props.value}
        onChangeText={props.onChange}
        editable={!props.disabled}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
      />
      {props.rightIcon && <FontAwesomeIcon style={props.iconStyle} icon={props.rightIcon} />}
    </View>
  )
}

const PADDING_X = 16
const PADDING_Y = 8
const ICON_SPACER = 8

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    color: LIGHT_COLOR,
    borderRadius: BORDER_RADIUS
  },
  input: {
    flex: 1,
    paddingTop: PADDING_Y,
    paddingBottom: PADDING_Y,
    paddingLeft: PADDING_X,
    paddingRight: PADDING_X
  },
  leftRootSpacer: {
    paddingLeft: ICON_SPACER
  },
  rightRootSpacer: {
    paddingRight: ICON_SPACER
  },
  leftSpacer: {
    marginLeft: ICON_SPACER
  },
  rightSpacer: {
    marginRight: ICON_SPACER
  }
})

export default Input

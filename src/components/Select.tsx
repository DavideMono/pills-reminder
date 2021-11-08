import React, { VFC } from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { BACKGROUND_COLOR, BORDER_RADIUS, LIGHT_COLOR } from 'src/lib/constant'
import { Option } from 'src/lib/types'

type Props = {
  value: any
  onChange: (nextValue: any) => void
  options: Option[]
  rootStyle?: StyleProp<ViewStyle>
  selectStyle?: StyleProp<TextStyle>
  disabled?: boolean
}

const Select: VFC<Props> = (props) => {
  return (
    <View style={[styles.root, props.rootStyle]}>
      <Picker
        selectedValue={props.value}
        onValueChange={props.onChange}
        style={props.selectStyle}
        enabled={!props.disabled}
      >
        {props.options.map((option, i) => (
          <Picker.Item value={option.value} label={option.label} enabled={option.enabled} key={i} color={LIGHT_COLOR} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS
  }
})

export default Select

import React, { FC } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
}

const DismissKeyboardView: FC<Props> = (props) => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.root, props.style]}>{props.children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 }
})

export default DismissKeyboardView

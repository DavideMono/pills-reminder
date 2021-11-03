import React, { FC } from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'

const DismissKeyboardView: FC = (props) => {
  return (
    <KeyboardAvoidingView behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{props.children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default DismissKeyboardView

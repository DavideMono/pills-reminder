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
import BottomNavigation from 'src/components/BottomNavigation'

type Props = {
  navigation?: boolean
  style?: StyleProp<ViewStyle>
}

const DismissKeyboardView: FC<Props> = ({ navigation = true, ...props }) => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.root, props.style]}>
          {props.children}
          {navigation && <BottomNavigation />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 8 }
})

export default DismissKeyboardView

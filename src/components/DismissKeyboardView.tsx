import React, { FC } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from 'src/lib/types'
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
  navigate?: NativeStackNavigationProp<ScreenList>['navigate']
  style?: StyleProp<ViewStyle>
}

const DismissKeyboardView: FC<Props> = (props) => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.root, props.style]}>
          {props.children}
          {props.navigate && <BottomNavigation navigate={props.navigate} />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 8 }
})

export default DismissKeyboardView

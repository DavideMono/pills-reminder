import React, { FC, useMemo } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActionType, ScreenList } from 'src/lib/types'
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
import Button from 'src/components/Button'

type Props = {
  actions?: ActionType[]
  onNavigate?: NativeStackNavigationProp<ScreenList>['navigate']
  onGoBack?: NativeStackNavigationProp<ScreenList>['goBack']
  style?: StyleProp<ViewStyle>
}

const DismissKeyboardView: FC<Props> = (props) => {
  const hasActions = useMemo(() => props.onGoBack || props.actions?.length, [props.actions, props.onGoBack])
  return (
    <KeyboardAvoidingView behavior="height" style={[styles.padding, styles.flex]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.padding, styles.flex, props.style]}>
          {hasActions && (
            <View style={[styles.spacing, styles.flexContainer]}>
              {props.onGoBack && <Button size="xl" leftIcon="long-arrow-alt-left" onPress={props.onGoBack} />}
              <View style={styles.flex} />
              {props.actions?.map((action, index, array) => {
                const style: StyleProp<ViewStyle> = []
                const isNotFirst = index !== 0
                const isNotLast = index !== array.length - 1
                if (isNotFirst) style.push(styles.rightSpacer)
                if (isNotLast) style.push(styles.leftSpacer)
                return (
                  <Button key={index} styleRoot={style} size="xl" leftIcon={action.icon} onPress={action.onPress} />
                )
              })}
            </View>
          )}
          {props.children}
          {props.onNavigate && <BottomNavigation navigate={props.onNavigate} />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flexContainer: { display: 'flex', flexDirection: 'row' },
  flex: { flex: 1 },
  padding: { padding: 8 },
  spacing: { marginVertical: 8 },
  leftSpacer: { marginRight: 4 },
  rightSpacer: { marginLeft: 4 }
})

export default DismissKeyboardView

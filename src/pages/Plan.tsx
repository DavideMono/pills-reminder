import React, { VFC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenList } from 'src/lib/types'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import { StyleSheet } from 'react-native'
import Button from 'src/components/Button'

const Plan: VFC<NativeStackScreenProps<ScreenList, 'Plan'>> = (props) => {
  return (
    <DismissKeyboardView>
      <Button styleRoot={styles.component} onPress={() => props.navigation.goBack()} leftIcon="long-arrow-alt-left" />
    </DismissKeyboardView>
  )
}

export default Plan

const styles = StyleSheet.create({
  component: { marginVertical: 8 }
})

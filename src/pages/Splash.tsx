import React, { VFC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { PRIMARY } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'
import DismissKeyboardView from 'src/components/DismissKeyboardView'

const Splash: VFC = () => {
  return (
    <DismissKeyboardView style={styles.root}>
      <Text style={[COMMON_STYLE.title, styles.leftText]}>Pills</Text>
      <Text style={COMMON_STYLE.title}>Reminder</Text>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftText: {
    color: PRIMARY
  }
})

export default Splash

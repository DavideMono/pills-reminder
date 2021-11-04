import React, { VFC } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from 'src/components/Button'

const BottomNavigation: VFC = () => {
  return (
    <View style={styles.root}>
      <Button leftIcon="home" size="lg" onPress={() => {}} />
      <Button leftIcon="plus" color="primary" size="big" onPress={() => {}} />
      <Button leftIcon="calendar" size="lg" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

export default BottomNavigation

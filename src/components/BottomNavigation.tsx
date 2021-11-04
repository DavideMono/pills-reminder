import React, { VFC } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from 'src/components/Button'

const BottomNavigation: VFC = () => {
  return (
    <View style={styles.root}>
      <Button text="H" onPress={() => {}} />
      <Button color="primary" text="ADD" size="big" onPress={() => {}} />
      <Button text="C" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8
  }
})

export default BottomNavigation

import React, { VFC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const App: VFC = () => {
  return (
    <View style={styles.root}>
      <Text>Hello World!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
})

export default App

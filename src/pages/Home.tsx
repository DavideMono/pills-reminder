import React, { VFC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Home: VFC = () => {
  return (
    <View style={styles.root}>
      <Text>Hello world!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Home

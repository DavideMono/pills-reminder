import React, { useCallback, useEffect, VFC } from 'react'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { faCalendar, faHome, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { STORE_PILLS_KEY } from 'src/lib/constant'
import { useStore } from 'src/lib/store'
import BottomNavigation from 'src/components/BottomNavigation'
import Home from 'src/pages/Home'

library.add(faPlus, faHome, faCalendar)

const App: VFC = () => {
  const initialize = useStore((store) => store.initialize)

  const initializeStorage = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(STORE_PILLS_KEY)
      if (data !== null) {
        const parsed = JSON.parse(data)
        console.log('Not null', data, parsed)
        initialize(parsed)
      } else {
        console.log('Is null')
        initialize([])
      }
    } catch {
      console.log('On catch')
      initialize([])
    }
  }, [])

  useEffect(() => {
    initializeStorage()
  }, [])

  return (
    <View style={styles.root}>
      <Home />
      <BottomNavigation />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 12 }
})

export default App

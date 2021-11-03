import React, { useCallback, useEffect, VFC } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORE_PILLS_KEY } from 'src/lib/constant'
import { useStore } from 'src/lib/store'
import Home from 'src/pages/Home'

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

  return <Home />
}

export default App

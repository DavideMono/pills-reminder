import React, { useCallback, useEffect, useState, VFC } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { faBroom, faCalendar, faHome, faLongArrowAltRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { STORE_PILLS_KEY } from 'src/lib/constant'
import { useStore } from 'src/lib/store'
import Home from 'src/pages/Home'
import Splash from 'src/pages/Splash'
import Error from 'src/pages/Error'

library.add(faPlus, faHome, faCalendar, faBroom, faLongArrowAltRight)

const Stack = createNativeStackNavigator()
const theme: Theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#FFFFFF' } }

const App: VFC = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
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
      setError('Unable to load data. Please, close and reopen the app')
      initialize([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    initializeStorage()
  }, [])

  if (isLoading) {
    return <Splash />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

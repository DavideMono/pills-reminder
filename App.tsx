import React, { useCallback, useEffect, useState, VFC } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  faBroom,
  faCalendar,
  faCog,
  faHome,
  faLongArrowAltLeft,
  faLongArrowAltRight,
  faPills,
  faPlus,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { STORE_NAME_KEY, STORE_PILLS_KEY } from 'src/lib/constant'
import { useStore } from 'src/lib/store'
import { PillTask } from 'src/lib/types'
import { parseStoreValue } from 'src/lib/utils'
import Home from 'src/pages/Home'
import Account from 'src/pages/Account'
import Plan from 'src/pages/Plan'
import Splash from 'src/pages/Splash'
import Error from 'src/pages/Error'

library.add(faPlus, faHome, faCalendar, faBroom, faLongArrowAltRight, faCog, faPills, faLongArrowAltLeft, faTrashAlt)

const Stack = createNativeStackNavigator()
const theme: Theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#FFFFFF' } }

const App: VFC = () => {
  const [initialRoute, setInitialRoute] = useState<string>('Home')
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const initialize = useStore((store) => store.initialize)

  const initializeStorage = useCallback(async () => {
    let pills: PillTask[] = []
    let name: string = ''
    try {
      const data = await AsyncStorage.multiGet([STORE_PILLS_KEY, STORE_NAME_KEY])
      data.forEach(([key, value]) => {
        if (key === STORE_PILLS_KEY) {
          pills = parseStoreValue(value, [])
        }
        if (key === STORE_NAME_KEY) {
          name = parseStoreValue(value, '')
        }
      })
    } catch {
      console.log('On catch')
      setError('Unable to load data. Please, close and reopen the app')
    } finally {
      if (!name) setInitialRoute('Account')
      initialize(pills, name)
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
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Plan" component={Plan} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

import React, { useCallback, VFC } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from 'src/lib/types'
import Button from 'src/components/Button'

type Props = { navigate: NativeStackNavigationProp<ScreenList>['navigate'] }

const BottomNavigation: VFC<Props> = (props) => {
  const onNavigate = useCallback((route: keyof ScreenList) => props.navigate?.(route), [props.navigate])

  return (
    <View style={styles.root}>
      <Button leftIcon="home" variant="text" size="lg" onPress={() => onNavigate('Home')} />
      <Button leftIcon="plus" color="primary" size="big" onPress={() => onNavigate('Plan')} />
      <Button leftIcon="calendar" variant="text" size="lg" onPress={() => {}} />
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

import React, { useCallback, VFC } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList, ThemeColor } from 'src/lib/types'
import Button from 'src/components/Button'

type Props = { route: keyof ScreenList; navigate: NativeStackNavigationProp<ScreenList>['navigate'] }
const isRoute = (expected: keyof ScreenList, route?: keyof ScreenList): ThemeColor =>
  route === expected ? 'primary' : 'default'

const BottomNavigation: VFC<Props> = (props) => {
  const onNavigate = useCallback((route: keyof ScreenList) => props.navigate?.(route), [props.navigate])

  return (
    <View style={styles.root}>
      <Button
        leftIcon="home"
        variant="text"
        color={isRoute('Home', props.route)}
        size="lg"
        onPress={() => onNavigate('Home')}
      />
      <Button leftIcon="plus" color="primary" size="big" onPress={() => onNavigate('Plan')} />
      <Button
        leftIcon="calendar"
        variant="text"
        color={isRoute('Calendar', props.route)}
        size="lg"
        onPress={() => onNavigate('Calendar')}
      />
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

import React, { useCallback, useMemo, useState, VFC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import shallow from 'zustand/shallow'
import { COMMON_STYLE } from 'src/lib/styles'
import { useStore } from 'src/lib/store'
import { ScreenList } from 'src/lib/types'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Input from 'src/components/Input'
import Button from 'src/components/Button'

const Account: VFC<NativeStackScreenProps<ScreenList, 'Account'>> = (props) => {
  const [actualName, updateName] = useStore((store) => [store.name, store.updateName], shallow)
  const [name, setName] = useState<string>(actualName)
  const isNextDisabled = useMemo(() => !name, [name])
  const clear = useCallback(() => setName(''), [])
  const update = useCallback(() => {
    updateName(name)
    props.navigation.navigate('Home')
  }, [name, updateName, props.navigation])

  return (
    <DismissKeyboardView>
      <View style={styles.root}>
        <Text style={[COMMON_STYLE.title, styles.text]}>What's your name?</Text>
        <Input style={styles.input} value={name} onChange={setName} placeholder="Insert your name" />
      </View>
      <View style={styles.actions}>
        <Button
          styleRoot={[styles.action, styles.leftAction]}
          size="xl"
          text="CLEAR"
          rightIcon="broom"
          onPress={clear}
        />
        <Button
          styleRoot={[styles.action, styles.rightAction]}
          disabled={isNextDisabled}
          size="xl"
          color="primary"
          text="NEXT"
          rightIcon="long-arrow-alt-right"
          onPress={update}
        />
      </View>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  root: { display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 },
  text: { marginBottom: 12 },
  input: { width: '100%' },
  actions: { display: 'flex', flexDirection: 'row' },
  action: { flex: 1 },
  leftAction: { marginRight: 4 },
  rightAction: { marginLeft: 4 }
})

export default Account

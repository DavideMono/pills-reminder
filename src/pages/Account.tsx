import React, { useMemo, useState, VFC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COMMON_STYLE } from 'src/lib/styles'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Input from 'src/components/Input'
import Button from 'src/components/Button'

const Account: VFC = () => {
  const [name, setName] = useState<string>('')
  const isNextDisabled = useMemo(() => !name, [name])

  return (
    <DismissKeyboardView navigation={false}>
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
          onPress={() => {}}
        />
        <Button
          styleRoot={[styles.action, styles.rightAction]}
          disabled={isNextDisabled}
          size="xl"
          color="primary"
          text="NEXT"
          rightIcon="long-arrow-alt-right"
          onPress={() => console.log('Apply')}
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

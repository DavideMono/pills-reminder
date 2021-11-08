import React, { useMemo, useState, VFC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { COMMON_STYLE } from 'src/lib/styles'
import { ScreenList, TIME_AMOUNT_MEASURE_LABELS, TimeAmountMeasure } from 'src/lib/types'
import { enumToOptions } from 'src/lib/utils'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Select from 'src/components/Select'

const Plan: VFC<NativeStackScreenProps<ScreenList, 'Plan'>> = (props) => {
  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [timeAmount, setTimeAmount] = useState<string>('')
  const [timeAmountMeasure, setTimeAmountMeasure] = useState<TimeAmountMeasure>('days')
  const timeAmountMeasureOptions = useMemo(() => enumToOptions(TIME_AMOUNT_MEASURE_LABELS), [])

  return (
    <DismissKeyboardView>
      <View style={[styles.component, styles.flexContainer]}>
        <Button size="xl" leftIcon="long-arrow-alt-left" onPress={() => props.navigation.goBack()} />
        <View style={styles.flexBig} />
      </View>
      <Text style={[styles.component, COMMON_STYLE.title]}>Add Plan</Text>
      <Text style={styles.component}>Pills name</Text>
      <Input style={styles.component} value={name} onChange={setName} leftIcon="pills" placeholder="Insert the name" />
      <Text style={styles.component}>Amount & How long?</Text>
      <Input
        style={[styles.component]}
        value={amount}
        onChange={setAmount}
        leftIcon="pills"
        placeholder="How many?"
        keyboardType="number-pad"
      />
      <View style={[styles.component, styles.flexContainer]}>
        <Input
          style={[styles.flexBig, styles.leftSpacer]}
          value={timeAmount}
          onChange={setTimeAmount}
          keyboardType="number-pad"
          leftIcon="calendar"
          placeholder="For how long?"
        />
        <Select
          value={timeAmountMeasure}
          onChange={setTimeAmountMeasure}
          options={timeAmountMeasureOptions}
          rootStyle={[styles.flexBig, styles.rightSpacer]}
        />
      </View>
    </DismissKeyboardView>
  )
}

export default Plan

const styles = StyleSheet.create({
  component: { marginVertical: 8 },
  flexContainer: { display: 'flex', flexDirection: 'row' },
  flexBig: { flex: 1 },
  leftSpacer: { marginRight: 4 },
  rightSpacer: { marginLeft: 4 }
})

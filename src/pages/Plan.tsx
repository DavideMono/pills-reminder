import React, { useCallback, useMemo, useState, VFC } from 'react'
import { ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import DatePicker from 'react-native-date-picker'
import { add, startOfToday } from 'date-fns'
import { EAT_TIMES } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'
import { DayEatTime, ScreenList, ThemeColor, TIME_AMOUNT_MEASURE_LABELS, TimeAmountMeasure } from 'src/lib/types'
import { capitalize, enumToOptions, getFormattedTimestamp } from 'src/lib/utils'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Select from 'src/components/Select'

const DEFAULT_TIME = '10:00'

const Plan: VFC<NativeStackScreenProps<ScreenList, 'Plan'>> = (props) => {
  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [timeAmount, setTimeAmount] = useState<string>('')
  const [timeAmountMeasure, setTimeAmountMeasure] = useState<TimeAmountMeasure>('days')
  const [eatTimes, setEatTimes] = useState<DayEatTime[]>([])
  const [notifications, setNotifications] = useState<string[]>(['10:00'])
  const [nextActiveDate, setNextActiveDate] = useState<string>(DEFAULT_TIME)
  const [pickerState, setPickerState] = useState<{ date: Date; index: number }>({ date: new Date(), index: -2 })
  const timeAmountMeasureOptions = useMemo(() => enumToOptions(TIME_AMOUNT_MEASURE_LABELS), [])

  const onEdit = useCallback((timestamp: string, index: number) => {
    const split = timestamp.split(':')
    const today = startOfToday()
    const date = add(today, { hours: Number(split[0]), minutes: Number(split[1]) })
    setPickerState({ date, index })
  }, [])

  const onSubmit = useCallback(
    (nextDate: Date) => {
      setPickerState({ date: new Date(), index: -2 })
      const nextTimestamp = getFormattedTimestamp(nextDate)
      if (pickerState.index === -1) {
        setNextActiveDate(nextTimestamp)
      } else if (pickerState.index >= 0 && pickerState.index <= notifications.length - 1) {
        setNotifications((prev) => {
          const next = [...prev]
          next[pickerState.index] = nextTimestamp
          return next
        })
      }
    },
    [notifications, pickerState]
  )

  const onCancel = useCallback(() => {
    setPickerState({ date: new Date(), index: -2 })
  }, [])

  const onEatToggle = useCallback((eatTime: DayEatTime) => {
    setEatTimes((prev) => {
      const index = prev.findIndex((e) => e === eatTime)
      const next = [...prev]
      if (index === -1) next.push(eatTime)
      else next.splice(index, 1)
      return next
    })
  }, [])

  const onNotificationAdd = useCallback((nextNotification: string) => {
    setNextActiveDate(DEFAULT_TIME)
    setNotifications((prev) => {
      const next = [...prev]
      next.push(nextNotification)
      return next
    })
  }, [])

  const onNotificationRemove = useCallback((index: number) => {
    setNotifications((prev) => {
      const next = [...prev]
      next.splice(index, 1)
      return next
    })
  }, [])

  const onDone = useCallback(() => {
    const amountAsNumber = parseInt(amount)
    const timeAmountAsNumber = parseInt(timeAmount)
    const hasName = !!name
    const hasAmount = !!amount && !Number.isNaN(amountAsNumber) && amountAsNumber > 0
    const hasTimeAmount = !!timeAmount && !Number.isNaN(timeAmountAsNumber) && timeAmountAsNumber > 0
    const isEatTimeSelected = !!eatTimes.length
    const hasNotification = !!notifications.length
    if (hasName && hasAmount && hasTimeAmount && isEatTimeSelected && hasNotification) {
      console.log('Valid')
    } else {
      console.error('Invalid', { hasName, hasAmount, hasTimeAmount, isEatTimeSelected, hasNotification })
    }
  }, [name, amount, timeAmount, timeAmountMeasure, eatTimes, notifications])

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
      <Text style={styles.component}>Which part of day?</Text>
      <View style={[styles.component, styles.flexContainer]}>
        {EAT_TIMES.map((eat, index, array) => {
          const text = capitalize(eat)
          const color: ThemeColor = eatTimes.includes(eat) ? 'primary' : 'default'
          const style: StyleProp<ViewStyle> = [styles.flexBig, styles.textCenter]
          const isNotFirst = index !== 0
          const isNotLast = index !== array.length - 1
          if (isNotFirst) style.push(styles.rightSpacer)
          if (isNotLast) style.push(styles.leftSpacer)
          return <Button key={index} styleRoot={style} onPress={() => onEatToggle(eat)} text={text} color={color} />
        })}
      </View>
      <Text style={styles.component}>When do we have to remind you?</Text>
      <ScrollView style={styles.component}>
        {notifications.map((notification, index) => (
          <View key={index} style={[styles.component, styles.flexContainer]}>
            <Button
              styleRoot={[styles.flexBig, styles.leftSpacer]}
              text={notification}
              onPress={() => onEdit(notification, index)}
            />
            <Button
              styleRoot={styles.rightSpacer}
              color="secondary"
              leftIcon="trash-alt"
              onPress={() => onNotificationRemove(index)}
            />
          </View>
        ))}
        <View style={[styles.component, styles.flexContainer]}>
          <Button
            styleRoot={[styles.flexBig, styles.leftSpacer]}
            text={nextActiveDate}
            onPress={() => onEdit(nextActiveDate, -1)}
          />
          <Button
            styleRoot={styles.rightSpacer}
            color="primary"
            leftIcon="plus"
            onPress={() => onNotificationAdd(nextActiveDate)}
          />
        </View>
      </ScrollView>
      <Button styleRoot={styles.textCenter} text="DONE" color="primary" onPress={onDone} />
      <DatePicker
        modal
        open={pickerState.index !== -2}
        mode="time"
        title="Select hours and minutes"
        confirmText="Confirm"
        cancelText="Cancel"
        date={pickerState.date}
        onConfirm={onSubmit}
        onCancel={onCancel}
      />
    </DismissKeyboardView>
  )
}

export default Plan

const styles = StyleSheet.create({
  component: { marginVertical: 8 },
  flexContainer: { display: 'flex', flexDirection: 'row' },
  flexBig: { flex: 1 },
  leftSpacer: { marginRight: 4 },
  rightSpacer: { marginLeft: 4 },
  textCenter: { justifyContent: 'center' }
})

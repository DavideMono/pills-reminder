import React, { VFC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COMMON_STYLE } from 'src/lib/styles'
import { DayTaskState, PillTask, ThemeColor } from 'src/lib/types'
import Button from 'src/components/Button'

const noop = () => {}
const colorMap: { [index: string]: ThemeColor } = {
  scheduled: 'default',
  done: 'primary',
  skipped: 'secondary'
}

type Props = {
  task: PillTask
  currentDate: string
  showTitle: boolean
  onMark: (notification: string, status: DayTaskState) => void
}

const SingleMark: VFC<Props> = (props) => {
  if (!props.task.taskState[props.currentDate]) {
    const title = props.showTitle ? `for ${props.task.name}` : ''
    return (
      <View style={[styles.spacing, styles.flexContainer, styles.flexCenter]}>
        <Text style={COMMON_STYLE.subtitleLight}>Nothing to mark today {title}</Text>
      </View>
    )
  }

  return (
    <View style={styles.spacing}>
      {props.showTitle && <Text style={COMMON_STYLE.subtitle}>{props.task.name}</Text>}
      {Object.entries(props.task.taskState[props.currentDate]).map(([notification, state], index) => {
        const color: ThemeColor = colorMap[state]
        return (
          <View key={index} style={[styles.spacing, styles.flexContainer]}>
            <Button
              styleRoot={[styles.flex, styles.noRoundRight]}
              size="lg"
              color={color}
              text={notification}
              onPress={noop}
            />
            <Button
              styleRoot={[styles.noRoundRight, styles.noRoundLeft]}
              size="lg"
              leftIcon="broom"
              onPress={() => props.onMark(notification, 'scheduled')}
            />
            <Button
              styleRoot={[styles.noRoundRight, styles.noRoundLeft]}
              size="lg"
              leftIcon="history"
              onPress={() => props.onMark(notification, 'skipped')}
            />
            <Button
              styleRoot={styles.noRoundLeft}
              size="lg"
              leftIcon="check"
              onPress={() => props.onMark(notification, 'done')}
            />
          </View>
        )
      })}
    </View>
  )
}

export default SingleMark

const styles = StyleSheet.create({
  flexContainer: { display: 'flex', flexDirection: 'row' },
  flexCenter: { justifyContent: 'center' },
  flex: { flex: 1 },
  spacing: { marginVertical: 8 },
  noRoundRight: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  noRoundLeft: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
})

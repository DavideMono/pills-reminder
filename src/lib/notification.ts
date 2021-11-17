import PushNotification, { Importance } from 'react-native-push-notification'
import { startOfTomorrow } from 'date-fns'
import { PillTask } from 'src/lib/types'
import { getDateWithTimestamp } from 'src/lib/utils'

export const getChannelId = (task: PillTask) => `channel-${task.name}`

export const deleteChannel = (task: PillTask) => {
  PushNotification.deleteChannel(getChannelId(task))
}

export const createChannel = (task: PillTask) => {
  PushNotification.createChannel(
    {
      channelId: getChannelId(task),
      channelName: task.name,
      channelDescription: `Notification to take ${task.name}`,
      importance: Importance.HIGH
    },
    (created) => {
      if (created) {
        task.timeNotification.forEach((timestamp) => {
          const date = getDateWithTimestamp(startOfTomorrow(), timestamp)
          PushNotification.localNotificationSchedule({
            channelId: getChannelId(task),
            allowWhileIdle: true,
            title: `It's time to take ${task.name}`,
            message: 'You have to take your pill',
            date: date,
            repeatType: 'day',
            visibility: 'secret',
            importance: 'high',
            repeatTime: task.totalAmount
          })
        })
      } else {
        console.error('Unable to set notification for task', task.name)
      }
    }
  )
}

export const reclaimChannel = (task: PillTask, prevTask: PillTask) => {
  deleteChannel(prevTask)
  createChannel(task)
}

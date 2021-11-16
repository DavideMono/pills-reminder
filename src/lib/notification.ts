import PushNotification from 'react-native-push-notification'
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
      channelDescription: `Notification to take ${task.name}`
    },
    (created) => {
      if (created) {
        task.timeNotification.forEach((timestamp) => {
          PushNotification.localNotificationSchedule({
            channelId: getChannelId(task),
            allowWhileIdle: true,
            title: `It's time to take ${task.name}`,
            message: 'You have to take your pill',
            date: getDateWithTimestamp(timestamp),
            repeatType: 'day',
            visibility: 'secret',
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
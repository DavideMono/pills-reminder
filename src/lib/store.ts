import create from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORE_NAME_KEY, STORE_PILLS_KEY } from 'src/lib/constant'
import { createChannel, deleteChannel, reclaimChannel } from 'src/lib/notification'
import { Store } from 'src/lib/types'

export const useStore = create<Store>((set) => ({
  name: '',
  tasks: [],
  updateName: (nextName) => set(() => ({ name: nextName })),
  add: (task) => {
    return set((store) => {
      createChannel(task)
      const updatedTasks = store.tasks.concat(task)
      return { tasks: updatedTasks }
    })
  },
  update: (task, index) => {
    return set((store) => {
      const updatedTasks = store.tasks.splice(index, 1, task)
      reclaimChannel(task, updatedTasks[0])
      return { tasks: store.tasks }
    })
  },
  delete: (index) => {
    return set((store) => {
      const updatedTasks = [...store.tasks].splice(index, 1)
      deleteChannel(updatedTasks[0])
      return { tasks: updatedTasks }
    })
  },
  initialize: (tasks, name) => set(() => ({ tasks, name }))
}))

const onTaskUpdate = (store: Store, prevStore: Store) => {
  const oldTasks = JSON.stringify(prevStore.tasks)
  const nextTasks = JSON.stringify(store.tasks)
  const oldName = JSON.stringify(prevStore.name)
  const nextName = JSON.stringify(store.name)
  if (oldTasks !== nextTasks) AsyncStorage.setItem(STORE_PILLS_KEY, nextTasks)
  if (oldName !== nextName) AsyncStorage.setItem(STORE_NAME_KEY, nextName)
}

useStore.subscribe(onTaskUpdate)

import create from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORE_PILLS_KEY } from 'src/lib/constant'
import { Store } from 'src/lib/types'

export const useStore = create<Store>((set) => ({
  tasks: [],
  add: (task) => {
    return set((store) => {
      const updatedTasks = store.tasks.concat(task)
      return { tasks: updatedTasks }
    })
  },
  update: (task, index) => {
    return set((store) => {
      const updatedTasks = store.tasks.splice(index, 1, task)
      return { tasks: updatedTasks }
    })
  },
  delete: (index) => {
    return set((store) => {
      const updatedTasks = [...store.tasks].splice(index, 1)
      return { tasks: updatedTasks }
    })
  },
  initialize: (tasks) => set(() => ({ tasks }))
}))

const onTaskUpdate = (store: Store) => {
  const nextTasks = JSON.stringify(store.tasks)
  AsyncStorage.setItem(STORE_PILLS_KEY, nextTasks)
    .then(() => {
      console.log('Updated', nextTasks)
    })
    .catch(() => {
      console.error('Error on update')
    })
}

useStore.subscribe(onTaskUpdate)

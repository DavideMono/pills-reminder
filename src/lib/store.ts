import create from 'zustand'
import { Store } from 'src/lib/types'

export const useStore = create<Store>((set) => ({
  tasks: [],
  add: (task) => set((store) => ({ tasks: [...store.tasks, task] })),
  update: (task, index) => {
    return set((store) => {
      const updatedTasks = [...store.tasks].splice(index, 1, { ...task })
      return { tasks: updatedTasks }
    })
  },
  delete: (index) => {
    return set((store) => {
      const updatedTasks = [...store.tasks].splice(index, 1)
      return { tasks: updatedTasks }
    })
  }
}))

import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  list: [
    { id: '1', title: 'Learn Redux', completed: false },
    { id: '2', title: 'Build Task Manager', completed: true },
  ],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action) {
        state.list.push(action.payload)
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        }
      },
    },
    taskToggled(state, action) {
      const task = state.list.find(t => t.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    taskUpdated(state, action) {
      const { id, title } = action.payload
      const task = state.list.find(t => t.id === id)
      if (task) {
        task.title = title
      }
    },
    taskDeleted(state, action) {
      state.list = state.list.filter(t => t.id !== action.payload)
    },
    tasksCleared(state) {
      state.list = []
    },
  },
})

export const {
  taskAdded,
  taskToggled,
  taskUpdated,
  taskDeleted,
  tasksCleared,
} = tasksSlice.actions

export default tasksSlice.reducer

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { taskAdded } from '../state/tasksSlice'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = evt => {
    evt.preventDefault()
    if (!title.trim()) return
    dispatch(taskAdded(title.trim()))
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New task..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

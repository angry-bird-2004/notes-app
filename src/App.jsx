import React, { useState, useEffect, useCallback } from 'react'
import { Reorder } from 'framer-motion'
import Form from './compnent/Form'
import Card from './compnent/Card'
const STORAGE_KEY = 'notes_app_tasks'

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = useCallback((task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now() }])
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }, [])

  const editTask = useCallback((id, updatedTask) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    )
  }, [])

  return (
    <div className="bg-gray-500 min-h-screen p-4">
      <Form onAdd={addTask} />

      <h1 className="text-white text-2xl font-bold p-4">
        Your Notes
      </h1>

      <Reorder.Group
        axis="x"
        values={tasks}
        onReorder={setTasks}
        className="flex flex-wrap gap-4 justify-center"
      >
        {tasks.map(task => (
          <Reorder.Item key={task.id} value={task}>
            <Card
              task={task}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}

export default App

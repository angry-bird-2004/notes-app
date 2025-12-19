import React, { useState, memo } from 'react'
import { motion } from 'framer-motion'

const Card = memo(({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [details, setDetails] = useState(task.details)

  const saveEdit = () => {
    onEdit(task.id, { title, details })
    setIsEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded shadow p-4 w-64 h-52 overflow-auto"
    >
      {isEditing ? (
        <>
          <input
            className="border rounded w-full mb-2 px-2 py-1"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded w-full mb-2 px-2 py-1"
            value={details}
            onChange={e => setDetails(e.target.value)}
          />
          <button
            onClick={saveEdit}
            className="text-green-600 font-semibold"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="font-bold text-lg mb-1">{task.title}</h2>
          <p className="text-gray-700 mb-2">{task.details}</p>

          <div className="flex justify-between">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
})

export default Card

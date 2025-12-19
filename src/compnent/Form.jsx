import React, { useState, memo } from 'react'

const Form = memo(({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    onAdd({ title, details })
    setTitle('')
    setDetails('')
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 max-w-md mx-auto">
      <input
        className="border rounded px-4 py-2"
        placeholder="Note title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border rounded px-4 py-2 h-28"
        placeholder="Note details"
        value={details}
        onChange={e => setDetails(e.target.value)}
        required
      />

      <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add Note
      </button>
    </form>
  )
})

export default Form

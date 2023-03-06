import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')

  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [change, setChange] = useState(0)
  const effectRan = useRef(false)

  const onLabelNew = (e) => {
    setLabel(e.target.value)
  }
  const onMinutesNew = (e) => {
    setMinutes(e.target.value)
  }
  const onSecondsNew = (e) => {
    setSeconds(e.target.value)
  }

  const onSubmitNew = (e) => {
    e.preventDefault()
    if (label.trim() == '') setLabel('Some task')
    if (minutes.trim() == '') setMinutes('0')
    if (seconds.trim() == '') setSeconds('15')
    setChange(!change)
    effectRan.current = true
  }

  useEffect(() => {
    if (effectRan.current === true) {
      onItemAdded(label, new Date(), minutes, seconds)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }, [change])

  return (
    <form className="new-todo-form" onSubmit={onSubmitNew}>
      <input type="submit" hidden />
      <input
        type="text"
        className="new-todo"
        onChange={onLabelNew}
        placeholder="What needs to be done?"
        value={label}
      />
      <input
        type="text"
        pattern="[0-9]*"
        className="new-todo-timer"
        placeholder="Min"
        onChange={onMinutesNew}
        value={minutes}
      />
      <input
        type="text"
        pattern="[0-9]*"
        className="new-todo-timer"
        placeholder="Sec"
        onChange={onSecondsNew}
        value={seconds}
      />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}

export default NewTaskForm

import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Task.css'

function Task({ id, label, minutes, seconds, date, onDeleted, onToggleDone, done, onSetUpdate }) {
  const [newLabel, setNewLabel] = useState('')
  const [editing, setEditing] = useState(false)
  const [putMinutes, setMinutes] = useState(minutes)
  const [putSeconds, setSeconds] = useState(seconds)
  const [play, setPlay] = useState(false)

  const onLabelChange = (e) => {
    setNewLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (newLabel.trim() != '') onSetUpdate(newLabel, id)
    setNewLabel('')
    setEditing(false)
  }

  const handleEditing = () => {
    setEditing(true)
  }

  const handleStart = () => {
    setPlay(true)
  }
  const handlePause = () => {
    setPlay(false)
  }

  const timerCounter = () => {
    if (putMinutes == 0 && putSeconds == 0) {
      setPlay(false)
    } else if (putSeconds > 0) {
      setSeconds((prevTime) => prevTime - 1)
    } else {
      setMinutes((prevTime) => prevTime - 1)
      setSeconds(59)
    }
  }

  useEffect(() => {
    let timer
    if (play) {
      timer = setInterval(() => timerCounter(), 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [play, putSeconds, putMinutes])

  const min = putMinutes < 10 ? `0${putMinutes}` : putMinutes
  const sec = putSeconds < 10 ? `0${putSeconds}` : putSeconds
  const buttonTimer = !play ? (
    <button type="button" className="icon icon-play" onClick={handleStart} />
  ) : (
    <button type="button" className="icon icon-pause" onClick={handlePause} />
  )
  let checked = null
  const taskdone = classnames({ done: done })
  let viewMode = {}
  let editMode = {}

  let result = formatDistanceToNow(date)

  if (editing) {
    viewMode.display = 'none'
  } else {
    editMode.display = 'none'
  }
  if (done) {
    checked = true
  }

  return (
    <li key={id}>
      <div className="view" style={viewMode}>
        <input className="toggle" type="checkbox" onClick={onToggleDone} checked={checked}></input>

        <label className="description">
          <span className={taskdone} onClick={onToggleDone}>
            {label}
          </span>
          <span className="timer">
            {buttonTimer}
            <span className="description-time">
              {min}:{sec}
            </span>
          </span>
          <span className="created">created {result} ago</span>
        </label>
        <button className="icon icon-edit" onClick={handleEditing}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          style={editMode}
          className="text-input"
          placeholder="type new task name"
          onChange={onLabelChange}
          value={newLabel}
        />
      </form>
    </li>
  )
}

Task.defaultProps = {
  id: 1000,
  label: 'Some task',
  date: new Date(),
  done: false,
  onDeleted: () => {},
  onToggleDone: () => {},
  setUpdate: () => {},
}

Task.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  date: PropTypes.object,
  done: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  setUpdate: PropTypes.func,
}

export default Task

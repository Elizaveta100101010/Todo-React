import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

function TaskList({ todos, onDeleted, onToggleDone, onSetUpdate }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task
        {...item}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={(e) => onToggleDone(e, id)}
        onSetUpdate={onSetUpdate}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [{}],
  onDeleted: () => {},
  onToggleDone: () => {},
  onSetUpdate: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onSetUpdate: PropTypes.func,
}

export default TaskList

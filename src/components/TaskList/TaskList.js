import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

export default class TaskList extends Component {
  static defaultProps = {
    todos: [{}],
    onDeleted: () => {},
    onToggleDone: () => {},
    onSetUpdate: () => {},
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onSetUpdate: PropTypes.func,
  }

  render() {
    const { todos, onDeleted, onToggleDone, onSetUpdate } = this.props
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
}

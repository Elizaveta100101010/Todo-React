import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './Footer.css'

export default class Footer extends Component {
  static defaultProps = {
    toDo: 0,
    filter: 'all',
    onFilterChange: () => {},
    onCompleteDelete: () => {},
  }

  static propTypes = {
    toDo: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    onCompleteDelete: PropTypes.func,
  }

  render() {
    const { toDo, onCompleteDelete, filter, onFilterChange } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onCompleteDelete}>
          Clear completed
        </button>
      </footer>
    )
  }
}

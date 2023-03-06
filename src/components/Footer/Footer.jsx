import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './Footer.css'

function Footer({ toDo, onCompleteDelete, filter, onFilterChange }) {
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

Footer.defaultProps = {
  toDo: 0,
  filter: 'all',
  onFilterChange: () => {},
  onCompleteDelete: () => {},
}

Footer.propTypes = {
  toDo: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onCompleteDelete: PropTypes.func,
}

export default Footer

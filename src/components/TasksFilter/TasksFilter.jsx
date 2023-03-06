import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

function TasksFilter({ filter, onFilterChange }) {
  const buttonsNames = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ]

  const buttons = buttonsNames.map(({ name, label }) => {
    const isActive = filter === name
    const clazz = isActive ? 'selected' : 'unselected'
    return (
      <li key={name}>
        <button className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })
  return <ul className="filters">{buttons}</ul>
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}

export default TasksFilter

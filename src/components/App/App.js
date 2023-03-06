import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import './App.css'

function App() {
  const date = new Date(2023, 1, 11)
  const [todoData, setTodoData] = useState([])
  const [filterState, setFilter] = useState('all')

  const switchFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  const createTodoItem = (label, date, minutes, seconds) => {
    return {
      label,
      done: false,
      id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      date,
      minutes: minutes,
      seconds: seconds,
    }
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const clearCompleted = () => {
    setTodoData(todoData.filter((e) => e.done === false))
  }

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return newArray
    })
  }

  const setUpdate = (text, id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newItem = todoData[idx]
      newItem.label = text
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return newArray
    })
  }
  const addItem = (text, date, minutes, seconds) => {
    const newItem = createTodoItem(text, date, minutes, seconds)
    setTodoData((todoData) => {
      const newArr = [newItem, ...todoData]
      return newArr
    })
  }

  const onToggleDone = (e, id) => {
    !e.target.value ? e.preventDefault() : null
    setTodoData((todoData) => {
      return toggleProperty(todoData, id, 'done')
    })
  }

  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  const todoCount = todoData.length - todoData.filter((el) => el.done).length
  const visibleItems = switchFilter(todoData, filterState)
  console.log(todoData)
  return (
    <div className="todoapp">
      <h1> todos </h1>
      <section className="main">
        <NewTaskForm onItemAdded={addItem} />
        <TaskList todos={visibleItems} onDeleted={deleteItem} onToggleDone={onToggleDone} onSetUpdate={setUpdate} />
        <Footer
          toDo={todoCount}
          onCompleteDelete={clearCompleted}
          filter={filterState}
          onFilterChange={onFilterChange}
        />
      </section>
    </div>
  )
}

App.defaultProps = {
  todoData: [
    {
      label: 'Some Task',
      done: false,
      id: 100,
      date: new Date(),
      minutes: 15,
      seconds: 0,
    },
  ],
  filter: 'all',
}

App.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
}

export default App

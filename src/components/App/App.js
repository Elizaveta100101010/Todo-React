import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import './App.css'

export default class App extends Component {
  maxId = 100
  date = new Date(2023, 1, 11)

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee', this.date),
      this.createTodoItem('Make Awesome App', this.date),
      this.createTodoItem('Have a lunch', this.date),
    ],
    filter: 'all',
  }

  static defaultProps = {
    todoData: [
      {
        label: 'Some Task',
        done: false,
        id: 100,
        date: new Date(),
      },
    ],
    filter: 'all',
  }

  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
  }

  filter(items, filter) {
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

  createTodoItem(label, date) {
    return {
      label,
      done: false,
      id: this.maxId++,
      date,
    }
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((e) => e.done === false)
      return {
        todoData: newArray,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  setUpdate = (text, id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newItem = todoData[idx]
      newItem.label = text
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }
  addItem = (text, date) => {
    const newItem = this.createTodoItem(text, date)
    this.setState(({ todoData }) => {
      const newArr = [newItem, ...todoData]
      return {
        todoData: newArr,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { todoData, filter } = this.state
    const todoCount = todoData.length - todoData.filter((el) => el.done).length
    const visibleItems = this.filter(todoData, filter)
    return (
      <div className="todoapp">
        <h1> todos </h1>
        <section className="main">
          <NewTaskForm onItemAdded={this.addItem} />
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onSetUpdate={this.setUpdate}
          />
          <Footer
            toDo={todoCount}
            onCompleteDelete={this.clearCompleted}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </div>
    )
  }
}

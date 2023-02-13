import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

export default class Task extends Component {
  state = {
    editing: false,
    label: '',
  }
  static defaultProps = {
    id: 1000,
    label: 'Some task',
    date: new Date(),
    done: false,
    onDeleted: () => {},
    onToggleDone: () => {},
    setUpdate: () => {},
  }

  static propTypes = {
    id: PropTypes.number,
    label: PropTypes.string,
    date: PropTypes.object,
    done: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    setUpdate: PropTypes.func,
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label == '') this.setState({ label: this.props.label })
    this.props.onSetUpdate(this.state.label, this.props.id)
    this.setState({ label: '', editing: false })
  }

  handleEditing = () => {
    this.setState({
      editing: true,
    })
  }

  render() {
    const { id, label, date, onDeleted, onToggleDone, done, onSetUpdate } = this.props
    let checked = null
    let classNames = ''
    let viewMode = {}
    let editMode = {}

    let result = formatDistanceToNow(date)

    if (this.state.editing) {
      viewMode.display = 'none'
    } else {
      editMode.display = 'none'
    }
    if (done) {
      classNames += 'done'
      checked = true
    }

    return (
      <li key={id}>
        <div className="view" style={viewMode}>
          <input className="toggle" type="checkbox" onClick={onToggleDone} checked={checked}></input>

          <label className="description">
            <span className={classNames} onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">created {result} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            style={editMode}
            className="text-input"
            placeholder="type new task name"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      </li>
    )
  }
}

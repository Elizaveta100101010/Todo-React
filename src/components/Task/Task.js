import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Task.css'

export default class Task extends Component {
  state = {
    editing: false,
    label: '',
    minutes: this.props.minutes,
    seconds: this.props.seconds,
    play: false,
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

  handleStart = (event) => {
    this.setState({
      play: true,
    })
  }
  handlePause = (event) => {
    this.setState({
      play: false,
    })
  }

  timerCounter = () => {
    const { minutes, seconds } = this.state
    if (minutes == 0 && seconds == 0) {
      this.setState({
        play: false,
      })
      clearInterval(this.timer)
    } else if (seconds > 0) {
      this.setState({
        seconds: seconds - 1,
      })
    } else {
      this.setState({
        minutes: minutes - 1,
        seconds: 59,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.play !== prevState.play) {
      this.state.play ? (this.timer = setInterval(() => this.timerCounter(), 1000)) : clearInterval(this.timer)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { id, label, date, onDeleted, onToggleDone, done, onSetUpdate } = this.props
    const { minutes, seconds, play, editing } = this.state
    const min = minutes < 10 ? `0${minutes}` : minutes
    const sec = seconds < 10 ? `0${seconds}` : seconds
    const buttonTimer = !play ? (
      <button type="button" className="icon icon-play" onClick={this.handleStart} />
    ) : (
      <button type="button" className="icon icon-pause" onClick={this.handlePause} />
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

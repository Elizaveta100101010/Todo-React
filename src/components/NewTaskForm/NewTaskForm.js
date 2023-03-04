import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    date: new Date(),
    minutes: '',
    seconds: '',
    change: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.change !== prevState.change) {
      this.props.onItemAdded(this.state.label, this.state.date, this.state.minutes, this.state.seconds)
      this.setState({ label: '', minutes: '', seconds: '' })
    }
  }

  static defaultProps = {
    onItemAdded: () => {},
  }

  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  onLabelNew = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  onMinutesNew = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }
  onSecondsNew = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  onSubmitNew = (e) => {
    e.preventDefault()
    console.log(this.state.label.length)
    if (this.state.label.trim() == '') this.setState({ label: 'Some task' })
    if (this.state.minutes.trim() == '') this.setState({ minutes: '0' })
    if (this.state.seconds.trim() == '') this.setState({ seconds: '15' })
    this.setState({ change: !this.state.change })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmitNew}>
        <input type="submit" hidden />
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelNew}
          placeholder="What needs to be done?"
          value={this.state.label}
        />
        <input
          type="text"
          pattern="[0-9]*"
          className="new-todo-timer"
          placeholder="Min"
          onChange={this.onMinutesNew}
          value={this.state.minutes}
        />
        <input
          type="text"
          pattern="[0-9]*"
          className="new-todo-timer"
          placeholder="Sec"
          onChange={this.onSecondsNew}
          value={this.state.seconds}
        />
      </form>
    )
  }
}

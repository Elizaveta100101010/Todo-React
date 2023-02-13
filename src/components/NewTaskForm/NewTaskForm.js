import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    date: new Date(),
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

  onSubmitNew = (e) => {
    e.preventDefault()
    if (this.state.label == '') this.setState({ label: 'Some task' })
    this.props.onItemAdded(this.state.label, this.state.date)
    this.setState({ label: '' })
  }

  render() {
    return (
      <form onSubmit={this.onSubmitNew}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelNew}
          placeholder="What needs to be done?"
          value={this.state.label}
        />
      </form>
    )
  }
}

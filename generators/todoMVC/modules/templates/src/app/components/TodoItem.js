var React = require('react');
var classnames = require('classnames');
var TodoTextInput = require('./TodoTextInput');

var TodoItem = React.createClass({
  propTypes: {
    todo: React.PropTypes.object.isRequired,
    editTodo: React.PropTypes.func.isRequired,
    deleteTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      editing: false
    };
  },

  handleChange: function () {
    this.props.completeTodo(this.props.todo.id);
  },

  handleClick: function () {
    this.props.deleteTodo(this.props.todo.id);
  },

  handleDoubleClick: function () {
    this.setState({editing: true});
  },

  handleSave: function (text) {
    if (text.length === 0) {
      this.props.deleteTodo(this.props.todo.id);
    } else {
      this.props.editTodo(this.props.todo.id, text);
    }
    this.setState({editing: false});
  },

  render: function () {
    var todo = this.props.todo;

    var element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleSave}
          />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.handleChange}
            />
          <label
            onDoubleClick={this.handleDoubleClick}
            >
            {todo.text}
          </label>
          <button
            className="destroy"
            onClick={this.handleClick}
            />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}
        >
        {element}
      </li>
    );
  }
});

module.exports = TodoItem;

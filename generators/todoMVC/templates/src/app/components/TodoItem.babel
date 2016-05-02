import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange() {
    this.props.completeTodo(this.props.todo.id);
  }

  handleClick() {
    this.props.deleteTodo(this.props.todo.id);
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave(text) {
    if (text.length === 0) {
      this.props.deleteTodo(this.props.todo.id);
    } else {
      this.props.editTodo(this.props.todo.id, text);
    }
    this.setState({editing: false});
  }

  render() {
    const {todo} = this.props;

    let element;
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
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoItem;

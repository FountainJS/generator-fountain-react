/// <reference path="../../../typings/index.d.ts" />

interface ITodoItemProps {
  todo: any;
  editTodo: (id: string, text: string) => void;
  deleteTodo: (id: string) => void;
  completeTodo: (id: string) => void;
};

interface ITodoItemState {
  editing: boolean;
};

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  static propTypes = {
    todo: React.PropTypes.object.isRequired,
    editTodo: React.PropTypes.func.isRequired,
    deleteTodo: React.PropTypes.func.isRequired,
    completeTodo: React.PropTypes.func.isRequired
  };

  constructor(props: any, context: any) {
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

  handleSave(text: string) {
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
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.completed}
            onChange={this.handleChange}
            />
          <label
            onDoubleClick={this.handleDoubleClick}
            >
            {todo.text}
          </label>
          <button
            className='destroy'
            onClick={this.handleClick}
            />
        </div>
      );
    }

    return (
      <li
        className={classNames({
          completed: todo.completed,
          editing: this.state.editing
        })}
        >
        {element}
      </li>
    );
  }
}

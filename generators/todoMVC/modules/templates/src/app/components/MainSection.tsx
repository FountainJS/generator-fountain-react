import * as React from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

interface IMainProps {
  todos: any[];
  actions: any;
};

interface IMainState {
  filter: string;
};

class MainSection extends React.Component<IMainProps, IMainState> {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {filter: SHOW_ALL};
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleCompleteAll = this.handleCompleteAll.bind(this);
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted();
  }

  handleCompleteAll() {
    this.props.actions.completeAll();
  }

  handleShow(filter: string) {
    this.setState({filter});
  }

  renderToggleAll(completedCount: number) {
    const {todos} = this.props;
    if (todos.length > 0) {
      return (
        <input
          className='toggle-all'
          type='checkbox'
          checked={completedCount === todos.length}
          onChange={this.handleCompleteAll}
          />
      );
    }
  }

  renderFooter(completedCount: number) {
    const {todos} = this.props;
    const {filter} = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
          />
      );
    }
  }

  render() {
    const {todos, actions} = this.props;
    const {filter} = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className='main'>
        {this.renderToggleAll(completedCount)}
        <ul className='todo-list'>
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              {...actions}
              />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

export default MainSection;

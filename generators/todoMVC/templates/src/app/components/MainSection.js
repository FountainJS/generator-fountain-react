var React = require('react');
var TodoItem = require('./TodoItem');
var Footer = require('./Footer');
var filters = require('../constants/TodoFilters');

var SHOW_ALL = filters.SHOW_ALL;
var SHOW_ACTIVE = filters.SHOW_ACTIVE;
var SHOW_COMPLETED = filters.SHOW_COMPLETED;

var TODO_FILTERS = {};
TODO_FILTERS[SHOW_ALL] = function () {
  return true;
};
TODO_FILTERS[SHOW_ACTIVE] = function (todo) {
  return !todo.completed;
};
TODO_FILTERS[SHOW_COMPLETED] = function (todo) {
  return todo.completed;
};

var MainSection = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      filter: SHOW_ALL
    };
  },

  handleClearCompleted: function () {
    this.props.actions.clearCompleted();
  },

  handleCompleteAll: function () {
    this.props.actions.completeAll();
  },

  handleShow: function (filter) {
    this.setState({
      filter: filter
    });
  },

  renderToggleAll: function (completedCount) {
    var todos = this.props.todos;
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={this.handleCompleteAll}
          />
      );
    }
  },

  renderFooter: function (completedCount) {
    var todos = this.props.todos;
    var filter = this.state.filter;
    var activeCount = todos.length - completedCount;

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
  },

  render: function () {
    var todos = this.props.todos;
    var actions = this.props.actions;
    var filter = this.state.filter;

    var filteredTodos = todos.filter(TODO_FILTERS[filter]);
    var completedCount = todos.reduce(function (count, todo) {
      return todo.completed ? count + 1 : count;
    }, 0);

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(function (todo) {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                {...actions}
                />
            );
          }, this)}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
});

module.exports = MainSection;

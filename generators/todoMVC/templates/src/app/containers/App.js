var React = require('react');
var bindActionCreators = require('redux').bindActionCreators;
var connect = require("react-redux").connect;
var Header = require('../components/Header');
var MainSection = require('../components/MainSection');
var TodoActions = require('../actions');

var App = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  },
  render: function () {
    var todos = this.props.todos;
    var actions = this.props.actions;
    return (
      <div>
        <Header
          addTodo={actions.addTodo}
          />
        <MainSection
          todos={todos}
          actions={actions}
          />
      </div>
    );
  }

});

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

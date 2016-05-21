var bindActionCreators = Redux.bindActionCreators;
var connect = ReactRedux.connect;

var ReactApp = React.createClass({
  propTypes: {
    todos: React.PropTypes.array,
    actions: React.PropTypes.object
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
    actions: bindActionCreators({
      addTodo: addTodo,
      deleteTodo: deleteTodo,
      editTodo: editTodo,
      completeTodo: completeTodo,
      completeAll: completeAll,
      clearCompleted: clearCompleted
    }, dispatch)
  };
}

var App = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactApp);

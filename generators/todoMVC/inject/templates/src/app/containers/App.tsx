/// <reference path="../../../typings/main.d.ts" />

const bindActionCreators = Redux.bindActionCreators;
const connect = ReactRedux.connect;

interface IAppProps {
  todos?: any[];
  actions?: any;
}

interface IAppState {}

class ReactApp extends React.Component<IAppProps, IAppState> {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  render() {
    const {todos, actions} = this.props;
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
}

function mapStateToProps(state: any) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch: IDispatch) {
  return {
    actions: bindActionCreators({
      addTodo,
      deleteTodo,
      editTodo,
      completeTodo,
      completeAll,
      clearCompleted
    }, dispatch)
  };
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactApp);

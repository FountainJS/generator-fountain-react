require('es6-shim');

var initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
];

function todos(state, action) {
  state = state || initialState;
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: (state.length === 0) ? 0 : state[0].id + 1,
          completed: false,
          text: action.text
        }
      ].concat(state);

    case DELETE_TODO:
      return state.filter(function (todo) {
        return todo.id !== action.id;
      });

    case EDIT_TODO:
      return state.map(function (todo) {
        return todo.id === action.id ?
          Object.assign({}, todo, {text: action.text}) :
          todo;
      });

    case COMPLETE_TODO:
      return state.map(function (todo) {
        return todo.id === action.id ?
          Object.assign({}, todo, {completed: !todo.completed}) :
          todo;
      });

    case COMPLETE_ALL: {
      var areAllMarked = state.every(function (todo) {
        return todo.completed;
      });
      return state.map(function (todo) {
        return Object.assign({}, todo, {completed: !areAllMarked});
      });
    }

    case CLEAR_COMPLETED:
      return state.filter(function (todo) {
        return todo.completed === false;
      });

    default:
      return state;
  }
}

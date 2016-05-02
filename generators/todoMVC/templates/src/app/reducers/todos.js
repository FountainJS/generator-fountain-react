var assign = require('object-assign');
var types = require('../constants/ActionTypes');

var initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
];

module.exports = function todos(state, action) {
  state = state || initialState;
  switch (action.type) {
    case types.ADD_TODO:
      return [
        {
          id: (state.length === 0) ? 0 : state[0].id + 1,
          completed: false,
          text: action.text
        }
      ].concat(state);

    case types.DELETE_TODO:
      return state.filter(function (todo) {
        return todo.id !== action.id;
      });

    case types.EDIT_TODO:
      return state.map(function (todo) {
        return todo.id === action.id ?
          assign({}, todo, {text: action.text}) :
          todo;
      });

    case types.COMPLETE_TODO:
      return state.map(function (todo) {
        return todo.id === action.id ?
          assign({}, todo, {completed: !todo.completed}) :
          todo;
      });

    case types.COMPLETE_ALL: {
      var areAllMarked = state.every(function (todo) {
        return todo.completed;
      });
      return state.map(function (todo) {
        return assign({}, todo, {completed: !areAllMarked});
      });
    }

    case types.CLEAR_COMPLETED:
      return state.filter(function (todo) {
        return todo.completed === false;
      });

    default:
      return state;
  }
};

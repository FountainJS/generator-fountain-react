var types = require('../constants/ActionTypes');

module.exports.addTodo = function addTodo(text) {
  return {
    type: types.ADD_TODO,
    text: text
  };
};

module.exports.deleteTodo = function deleteTodo(id) {
  return {
    type: types.DELETE_TODO,
    id: id
  };
};

module.exports.editTodo = function editTodo(id, text) {
  return {
    type: types.EDIT_TODO,
    id: id,
    text: text
  };
};

module.exports.completeTodo = function completeTodo(id) {
  return {
    type: types.COMPLETE_TODO,
    id: id
  };
};

module.exports.completeAll = function completeAll() {
  return {
    type: types.COMPLETE_ALL
  };
};

module.exports.clearCompleted = function clearCompleted() {
  return {
    type: types.CLEAR_COMPLETED
  };
};

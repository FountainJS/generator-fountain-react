var addTodo = function addTodo(text) {
  return {
    type: ADD_TODO,
    text: text
  };
};

var deleteTodo = function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id: id
  };
};

var editTodo = function editTodo(id, text) {
  return {
    type: EDIT_TODO,
    id: id,
    text: text
  };
};

var completeTodo = function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    id: id
  };
};

var completeAll = function completeAll() {
  return {
    type: COMPLETE_ALL
  };
};

var clearCompleted = function clearCompleted() {
  return {
    type: CLEAR_COMPLETED
  };
};

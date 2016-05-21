function addTodo(text: string) {
  return {type: ADD_TODO, text};
}

function deleteTodo(id: number) {
  return {type: DELETE_TODO, id};
}

function editTodo(id: number, text: string) {
  return {type: EDIT_TODO, id, text};
}

function completeTodo(id: number) {
  return {type: COMPLETE_TODO, id};
}

function completeAll() {
  return {type: COMPLETE_ALL};
}

function clearCompleted() {
  return {type: CLEAR_COMPLETED};
}

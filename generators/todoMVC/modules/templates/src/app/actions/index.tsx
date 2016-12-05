import * as types from '../constants/ActionTypes';

export function addTodo(text: string) {
  return {type: types.ADD_TODO, text};
}

export function deleteTodo(id: number) {
  return {type: types.DELETE_TODO, id};
}

export function editTodo(id: number, text: string) {
  return {type: types.EDIT_TODO, id, text};
}

export function completeTodo(id: number) {
  return {type: types.COMPLETE_TODO, id};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

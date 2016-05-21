describe('todo actions', function () {
  it('addTodo should create ADD_TODO action', function () {
    expect(addTodo('Use Redux')).toEqual({
      type: ADD_TODO,
      text: 'Use Redux'
    });
  });

  it('deleteTodo should create DELETE_TODO action', function () {
    expect(deleteTodo(1)).toEqual({
      type: DELETE_TODO,
      id: 1
    });
  });

  it('editTodo should create EDIT_TODO action', function () {
    expect(editTodo(1, 'Use Redux everywhere')).toEqual({
      type: EDIT_TODO,
      id: 1,
      text: 'Use Redux everywhere'
    });
  });

  it('completeTodo should create COMPLETE_TODO action', function () {
    expect(completeTodo(1)).toEqual({
      type: COMPLETE_TODO,
      id: 1
    });
  });

  it('completeAll should create COMPLETE_ALL action', function () {
    expect(completeAll()).toEqual({
      type: COMPLETE_ALL
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', function () {
    expect(clearCompleted()).toEqual({
      type: CLEAR_COMPLETED
    });
  });
});

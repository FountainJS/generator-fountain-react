var combineReducers = require('redux').combineReducers;
var todos = require('./todos');

var rootReducer = combineReducers({
  todos: todos
});

module.exports = rootReducer;

const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting() {
    this.fountainPrompting();
  },

  configuring() {
    this.mergeJson('package.json', {
      dependencies: {
        'react-dom': '^15.0.1',
        'react-redux': '^4.4.5',
        'redux': '^3.5.1'
      }
    });
  },

  writing: {
    src() {
      [
        'src/index.html',
        'src/index.js',

        'src/app/actions/index.js',

        'src/app/components/App.js',
        'src/app/components/Footer.js',
        'src/app/components/Link.js',
        'src/app/components/Todo.js',
        'src/app/components/TodoList.js',

        'src/app/containers/AddTodo.js',
        'src/app/containers/FilterLink.js',
        'src/app/containers/VisibleTodoList.js',

        'src/app/reducers/index.js',
        'src/app/reducers/todos.js',
        'src/app/reducers/visibilityFilter.js'
      ].map(file => this.copyTemplate(file, file));
    }
  }
});

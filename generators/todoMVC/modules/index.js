const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  configuring() {
    this.mergeJson('package.json', {
      dependencies: {
        'classnames': '^2.2.5',
        'react-dom': '^15.0.1',
        'react-redux': '^4.4.5',
        'redux': '^3.5.1',
        'es6-shim': '^0.35.0',
        'todomvc-app-css': '^2.0.4'
      }
    });
  },

  writing: {
    src() {
      const src = [
        'src/index.html',
        'src/index.js',
        'src/index.css',

        'src/app/actions/index.js',
        'src/app/actions/index.spec.js',

        'src/app/components/Footer.js',
        'src/app/components/Footer.spec.js',
        'src/app/components/Header.js',
        'src/app/components/Header.spec.js',
        'src/app/components/MainSection.js',
        'src/app/components/MainSection.spec.js',
        'src/app/components/TodoItem.js',
        'src/app/components/TodoItem.spec.js',
        'src/app/components/TodoTextInput.js',
        'src/app/components/TodoTextInput.spec.js',

        'src/app/constants/ActionTypes.js',
        'src/app/constants/TodoFilters.js',

        'src/app/containers/App.js',

        'src/app/reducers/index.js',
        'src/app/reducers/todos.js',
        'src/app/reducers/todos.spec.js',

        'src/app/store/configureStore.js'
      ];
      if (this.options.js === 'typescript') {
        src.push('src/app/assign.js');
      }
      src.map(file => this.copyTemplate(file, file));
    }
  }
});

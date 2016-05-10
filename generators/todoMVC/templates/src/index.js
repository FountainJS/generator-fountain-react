require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var App = require('./app/containers/App');
var configureStore = require('./app/store/configureStore');

require('todomvc-app-css/index.css');

var store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

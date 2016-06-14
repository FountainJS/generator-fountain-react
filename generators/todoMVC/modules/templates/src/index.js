require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var App = require('./app/containers/App');
var configureStore = require('./app/store/configureStore');
<% if (router === 'router') { -%>
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
<% } -%>

require('todomvc-app-css/index.css<%- modules === 'systemjs' ? '!' : '' %>');

var store = configureStore();

ReactDOM.render(
  <Provider store={store}>
<% if (router === 'router') { -%>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
    </Router>
<% } else { -%>
    <App/>
<% } -%>
  </Provider>,
  document.getElementById('root')
);

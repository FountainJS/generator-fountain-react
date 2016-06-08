var React = require('react');
var ReactDOM = require('react-dom');
<% if (router === 'router') { -%>
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
<% } -%>

var Hello = require('./app/hello');

require('./index.<%- css %>');

ReactDOM.render(
<% if (router === 'router') { -%>
  <Router history={browserHistory}>
    <Route path="/" component={Hello}/>
  </Router>,
<% } else { -%>
  <Hello/>,
<% } -%>
  document.getElementById('root')
);

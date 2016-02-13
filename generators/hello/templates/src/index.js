var React = require('react');
var ReactDOM = require('react-dom');
var Hello = require('./app/hello');

require('./index.<%- css %>');

ReactDOM.render(
  <Hello/>,
  document.getElementById('root')
);

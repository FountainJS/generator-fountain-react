<% if (modules === 'webpack') { -%>
var React = require('react');
var ReactDOM = require('react-dom');
var Hello = require('./app/hello');

require('./index.scss');
<% } -%>
<% if (modules === 'systemjs') { -%>
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './app/hello';
<% } -%>

ReactDOM.render(
  <Hello/>,
  document.getElementById('root')
);

<% if (modules === 'webpack') { -%>
const React = require('react');
const ReactDOM = require('react-dom');
const Hello = require('./app/hello');

require('./index.<%- css %>');

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

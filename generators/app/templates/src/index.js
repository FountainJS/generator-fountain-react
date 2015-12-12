<% if (modules) { -%>
import React from 'react';
import ReactDOM from 'react-dom';
import { Hello } from './app/hello';

<% } -%>
ReactDOM.render(
  <Hello/>,
  document.getElementById('root')
);

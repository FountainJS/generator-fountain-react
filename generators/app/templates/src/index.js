<% if (modules !== 'inject') { -%>
import React from 'react';
import ReactDOM from 'react-dom';
import { Hello } from './app/hello';

<%   if (modules === 'webpack') { -%>
import './index.scss'

<%   } -%>
<% } -%>
ReactDOM.render(
  <Hello/>,
  document.getElementById('root')
);

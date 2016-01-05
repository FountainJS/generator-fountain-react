/// <reference path="../typings/tsd.d.ts" />

<% if (modules !== 'inject') { -%>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from './app/hello';

<%   if (modules === 'webpack') { -%>
import './index.scss';

<%   } -%>
<% } -%>
ReactDOM.render(
  <Hello/>,
  document.getElementById('root')
);

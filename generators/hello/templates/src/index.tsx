import * as React from 'react';
import * as ReactDOM from 'react-dom';
<% if (router === 'router') { -%>
import {Router, Route, browserHistory} from 'react-router';
<% } -%>

import {Hello} from './app/hello';

import './index.<%- css %>';

ReactDOM.render(
<% if (router === 'router') { -%>
  <Router history={browserHistory}>
    <Route path='/' component={Hello}/>
  </Router>,
<% } else { -%>
  <Hello/>,
<% } -%>
  document.getElementById('root')
);

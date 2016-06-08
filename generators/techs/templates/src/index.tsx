/// <reference path="../typings/index.d.ts" />

import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
<% if (router === 'router') { -%>
import {Router, Route, browserHistory} from 'react-router';
<% } -%>

import {Main} from './app/main';

import './index.<%- css %>';

ReactDOM.render(
<% if (router === 'router') { -%>
  <Router history={browserHistory}>
    <Route path='/' component={Main}/>
  </Router>,
<% } else { -%>
  <Main/>,
<% } -%>
  document.getElementById('root')
);

/// <reference path="../typings/tsd.d.ts" />

import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Main} from './app/main';

import './index.<%- css %>';

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);

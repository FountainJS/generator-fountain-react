/// <reference path="../typings/main.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from './app/hello';

import './index.<%- css %>';

ReactDOM.render(
  <Hello/>,
  document.getElementById('root')
);

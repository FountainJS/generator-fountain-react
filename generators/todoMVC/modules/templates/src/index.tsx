import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IStore} from '~react-redux~redux';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import configureStore from './app/store/configureStore';
<% if (router === 'router') { -%>
import {Router, Route, browserHistory} from 'react-router';
<% } -%>

import 'todomvc-app-css/index.css<%- modules === 'systemjs' ? '!' : '' %>';

const store: IStore<any> = configureStore({});

ReactDOM.render(
  <Provider store={store}>
<% if (router === 'router') { -%>
    <Router history={browserHistory}>
      <Route path='/' component={App}/>
    </Router>
<% } else { -%>
    <App/>
<% } -%>
  </Provider>,
  document.getElementById('root')
);

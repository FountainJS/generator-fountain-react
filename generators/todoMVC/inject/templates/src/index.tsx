/// <reference path="../typings/index.d.ts" />

const Provider = ReactRedux.Provider;
const store: Redux.IStore<any> = Redux.createStore(rootReducer);
<% if (router === 'router') { -%>
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;
<% } -%>

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

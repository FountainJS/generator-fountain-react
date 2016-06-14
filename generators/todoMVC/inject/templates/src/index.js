var Provider = ReactRedux.Provider;
var store = Redux.createStore(rootReducer);
<% if (router === 'router') { -%>
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
<% } -%>

ReactDOM.render(
  <Provider store={store}>
<% if (router === 'router') { -%>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
    </Router>
<% } else { -%>
    <App/>
<% } -%>
  </Provider>,
  document.getElementById('root')
);

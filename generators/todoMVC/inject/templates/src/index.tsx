/// <reference path="../typings/index.d.ts" />

const Provider = ReactRedux.Provider;
const store: Redux.IStore<any> = Redux.createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

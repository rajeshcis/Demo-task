import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import {
  BrowserRouter,
} from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducers from './reducers/index';
import App from './App';

import { createBrowserHistory } from 'history';

const logger = createLogger();
const store = createStore(
    reducers,
    applyMiddleware(thunk, promise, logger)
);
const history = syncHistoryWithStore(createBrowserHistory(), store);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} history = {history}>
        <BrowserRouter >
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);
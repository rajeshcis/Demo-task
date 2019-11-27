import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Index from './index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
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
import reducers from '../../reducers/index';

import { createBrowserHistory } from 'history';
import Adapter from 'enzyme-adapter-react-16';

const logger = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(thunk, promise, logger)
);
const history = syncHistoryWithStore(createBrowserHistory(), store);

const MainApp = <AppContainer>
  <Provider store={store} history={history}>
    <BrowserRouter >
      <Index videos={[]} />
    </BrowserRouter>
  </Provider>
</AppContainer>

configure({ adapter: new Adapter() });
describe('Has Main component', () => {
  let wrapper;
  test('Title check', () => {
    wrapper = mount(MainApp);
    expect(wrapper.length).toEqual(1);
  })
  test('Render table check', () => {
    wrapper = mount(MainApp);
    let table = wrapper.find('table');
    expect(table.length).toEqual(1);
  })
})
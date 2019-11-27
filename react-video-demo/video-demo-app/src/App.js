import React from 'react';
import { Route } from 'react-router-dom';
import Header from './containers/header';
import SubHeader from './containers/header/SubHeader';

import Videos from './containers/videos';
import AddVideo from './containers/videos/new';
import EditVideo from './containers/videos/edit';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
  <div>
    <Header />
    <SubHeader />
    <Route exact path="/" component={Videos} />
    <Route exact path="/videos/new" component={AddVideo} />
    <Route exact path="/videos/:id/edit" component={EditVideo} />
  </div>
);

export default App;
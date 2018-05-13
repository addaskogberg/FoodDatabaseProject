import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import ReactDom from 'react-dom'; //installlerat som test

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import Food from './components/Food/Food';
import LogOut from './components/LogOut/LogOut';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/LogOut/LogOut" component={LogOut}/>
        <Route exact path="/Food/Food/:mat" render={(props) => <Food mat={mat} {...props} /> } />
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

/*
<Route path="/Food/Food" component={Food}/>
<Route exact path="/details/:id" render={(props) => <DetailsPage globalStore={globalStore} {...props} /> } />
*/
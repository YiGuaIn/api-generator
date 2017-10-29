import React, {Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './route/config';
const RouteWithSubRoutes = (route) => (
  
  <Route path={route.path} render={props => (
     <route.component {...props} routes={route.routes}/>
  )}/>
)
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
              {
                  routes.map((route, i) => (
                      <RouteWithSubRoutes key={i} {...route}/>
                      // <Route path={route.path} exact={route.exact} key={i} component={route.component}/>
                  ))
              }
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

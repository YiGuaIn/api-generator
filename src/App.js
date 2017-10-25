import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Link} from 'react-router-dom';
import routes from './route/config';
const RouteWithSubRoutes = (route) => (
  
  <Route path={route.path} render={props => (
     route.path === '/' ? (<Redirect to="/login"/>) : (<route.component {...props} routes={route.routes}/>)
  )}/>
)
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
            {
                routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                    // <Route path={route.path} exact={route.exact} key={i} component={route.component}/>
                ))
                
            }
        </div>
      </Router>
    );
  }
}

export default App;

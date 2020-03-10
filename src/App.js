import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "./history";
import { callback } from "./auth";

import PrivateRoute from "./Components/private-route";

import Home from "./Views/Home";
import Login from "./Views/Login";
import { Provider } from "react-redux";
import { Store } from "./store/store";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Router history={history}>
          <Switch>
            <PrivateRoute path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/callback" component={() => callback()} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "./history";
import { callback } from "./auth";

import PrivateRoute from "./Components/private-route";

import Search from "./Views/Search";
import Login from "./Views/Login";
import { Provider } from "react-redux";
import { Store } from "./store/store";
import Album from "./Views/Album";
import Artist from "./Views/Artist";
import Toastr from "./Components/toastr";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Toastr />
        <Router history={history}>
          <Switch>
            <PrivateRoute path="/" component={Search} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/callback" component={() => callback()} />
            <PrivateRoute path="/album/:id" component={Album} />
            <PrivateRoute path="/artista/:id" component={Artist} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import history from "./../history";
import { tokenName } from "./utils/restUtils";
import NavBar from "./navbar";

const PrivateRoute = props => {
  const verifyToken = () => {
    let token = localStorage.getItem(tokenName);
    if (token) {
      if (!token) {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  };
  useEffect(() => verifyToken());
  return (
    <>
      <NavBar />
      <main className="main">
        <Route {...props} />
      </main>
    </>
  );
};
export default PrivateRoute;

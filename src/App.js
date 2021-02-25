import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import MovieDetail from "./containers/MovieDetail";
import Movies from "./containers/Movies";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/movies/list" exact component={Movies} />
        <Route path="/movies/:id" component={MovieDetail} />
        <Redirect to="/movies/list" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

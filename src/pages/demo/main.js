import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch} from "react-router-dom";
import "style/css/normalize.css";
import Demo from "./components/index"
ReactDOM.render(
  (<HashRouter>
      <Switch>
        <Route path="/" component={Demo}/>
      </Switch>
    </HashRouter>
    ),
  document.getElementById('root')
)

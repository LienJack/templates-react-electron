import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch} from "react-router-dom";
import "style/css/normalize.css";
import './utils/rem'
import Demo from "./components/browser-download"
ReactDOM.render(
  (<HashRouter>
      <Switch>
        <Route path="/" component={Demo}/>
      </Switch>
    </HashRouter>
    ),
  document.getElementById('root')
)

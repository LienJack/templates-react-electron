import React, {Component} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route } from "react-router-dom";
import "style/css/normalize.css";
import AppRoutes from "./router"
ReactDOM.render(
    (<HashRouter>
        <Route path="/" component={AppRoutes}/>
    </HashRouter>),
    document.getElementById('root')
)

/**
 * Created by mac on 2019/6/5.
 */
import React, {Component} from "react";
import {Route} from "react-router-dom";
import Demo from "../components/index"

class AppRoutes extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Route exact path='/' component={Demo}/>
            </div>
        );
    }
}
export default AppRoutes

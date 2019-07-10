import React from 'react';
import {observer, Provider} from 'mobx-react/index';
import store from "../store"
@observer
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.store = store
    }
    render() {
        let {title} = this.store.state
        return (
            <Provider store={this.store} Page={this}>
               <div>
                   {title}
               </div>
            </Provider>
        );
    }
}
export default Demo;

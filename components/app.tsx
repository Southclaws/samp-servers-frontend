import * as React from "react";
import { Component } from "react";
import List from "./list/list"

export class App extends Component {
    getServerList() {
        fetch("http://api.samp.southcla.ws/v1/servers", {
            method: 'get',
            mode: 'no-cors'
        })
    }

    render() {
        // when ready, call this.getServerList() and render the server list

        return (<div>
            <List />
        </div>)
    }
}

export default App

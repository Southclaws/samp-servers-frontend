import * as React from "react";
import { Component } from "react";

import { ServerFull, ServerCore } from "./list/server"
import ServerList from "./list/list"
import ServerDetails from "./details/details"

interface AppProps { }
interface AppState {
    servers: ServerCore[]
}

export default class App extends Component<AppProps, AppState> {
    getServers(url: string) {
        fetch(url).then((res) => res.json()).then((data) => {
            this.setState({
                servers: data,
            })
        }).catch((err) => console.log('failed to get servers', err))
    }

    componentDidMount() {
        this.getServers("http://api.samp.southcla.ws/v1/servers")
    }

    render() {
        return (<div>
            <ServerList servers={this.state.servers} />
            <ServerDetails />
        </div>)
    }
}

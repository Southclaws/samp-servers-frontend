import * as React from "react";
import { Component } from "react";
import CServer from "./server"

interface ServerListProps {
    servers: Array<CServer>
}

interface ServerListState {
    selected: string
}

export default class ServerList extends Component<ServerListProps, ServerListState> {
    constructor(props: ServerListProps) {
        super(props)
        this.state = {
            selected: "" // nothing selected on init
        }
    }

    render() {
        let rows: Array<{}> = []
        this.props.servers.forEach(element => {
            rows.push(<li>{element}</li>)
        });
        return <ul>{rows}</ul>
    }
}

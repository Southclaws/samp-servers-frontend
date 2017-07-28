import * as React from "react";
import { Component } from "react";
import ServerCore from "./server"

interface ServerListProps {
    servers: ServerCore[]
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
        let rows: ServerCore[]
        this.props.servers.forEach(element => {
        });
        return <ul></ul>
    }
}

import * as React from "react";
import { Component } from "react";
import { Table } from 'semantic-ui-react';
import * as Fuse from 'fuse.js'

import ServerCore from "./server"
import ServerListRow from "./server"

interface IServerListProps extends React.Props<any> {
    servers: any
    filter: string
}

interface IServerListState { }

export default class ServerList extends Component<IServerListProps, IServerListState> {
    constructor(props: IServerListProps) {
        super(props)
    }

    render() {
        let servers: Array<ServerCore>;

        if (this.props.filter != "") {
            let fuse = new Fuse(this.props.servers, {
                shouldSort: true,
                threshold: 0.4,
                location: 0,
                distance: 25,
                maxPatternLength: 32,
                minMatchCharLength: 2,
                keys: [
                    "ip",
                    "hn",
                    "gm",
                    "la"
                ]
            });
            servers = fuse.search<ServerCore>(this.props.filter);
        } else {
            servers = this.props.servers
        }

        return (
            <Table celled inverted selectable size='small' >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Hostname</Table.HeaderCell>
                        <Table.HeaderCell>Players</Table.HeaderCell>
                        <Table.HeaderCell>Gamemode</Table.HeaderCell>
                        <Table.HeaderCell>Language</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    servers.map((server: any, index: number) => {
                        return <ServerListRow key={index} server={server} />
                    })
                }
                </Table.Body>
            </Table>
        )
    }
}

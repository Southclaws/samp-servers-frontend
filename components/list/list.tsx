import * as React from "react";
import { Component } from "react";
import { Table } from 'semantic-ui-react';

import ServerCore from "./server"
import ServerListRow from "./server"

interface IServerListProps extends React.Props<any> {
    servers: any
}

interface IServerListState {
    selected: string
}

export default class ServerList extends Component<IServerListProps, IServerListState> {
    constructor(props: IServerListProps) {
        super(props)
        this.state = {
            selected: "" // nothing selected on init
        }
    }

    render() {
        return (
            <Table celled inverted selectable>
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
                    this.props.servers.map((server: any, index: number) => {
                        return <ServerListRow key={index} server={server} />
                    })
                }
                </Table.Body>
            </Table>
        )
        // return (<table><tbody></tbody></table>)
    }
}

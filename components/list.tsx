import * as React from "react";
import { Component } from "react";
import { Table } from 'semantic-ui-react';
import * as Fuse from 'fuse.js'

import { ServerCore, ServerFull } from "./interfaces"
import ServerListRow from "./server"
import ServerDetails from "./details"

interface IServerListProps {
    servers: any
    filter: string
}

interface IServerListState {
    selected: ServerCore
}

export default class ServerList extends Component<IServerListProps, IServerListState> {
    constructor(props: IServerListProps) {
        super(props)
        this.props = {
            servers: props.servers,
            filter: props.filter,
        }
        this.state = {
            selected: null
        }
    }

    async select(server: ServerCore) {
        this.setState({
            selected: server,
        })
    }

    async unSelect() {
        this.setState({
            selected: null,
        })
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

        let renderModal = <div />

        if (this.state != null) {
            if (this.state.selected != null) {
                renderModal = <ServerDetails selected={this.state.selected} onClose={this.unSelect.bind(this)} />
            }
        }

        return (
            <div>
                {renderModal}
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
                            return <ServerListRow key={index} server={server} onClick={this.select.bind(this)} />
                        })
                    }
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

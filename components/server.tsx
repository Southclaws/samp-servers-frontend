import * as React from "react";
import { Component } from "react";
import { Table, Icon, Modal, Grid, List, Image } from 'semantic-ui-react';

import { ServerCore } from "./interfaces"
import { Link } from 'react-router-dom'


interface IServerProps {
    server: ServerCore
}

interface IServerState { }

export default class ServerListRow extends Component<IServerProps, IServerState> {
    constructor(props: IServerProps) {
        super(props)
    }

    render() {
        let passwordIcon = this.props.server.pa ? <Icon name='lock' /> : <Icon name='unlock' disabled />

        return (
            <Table.Row>
                <Table.Cell><Link to={"/server/" + this.props.server.ip}>
                    {passwordIcon}{this.props.server.ip}
                </Link></Table.Cell>

                <Table.Cell><Link to={"/server/" + this.props.server.ip}>
                    {this.props.server.hn}
                </Link></Table.Cell>

                <Table.Cell><Link to={"/server/" + this.props.server.ip}>
                    {this.props.server.pc}/{this.props.server.pm}
                </Link></Table.Cell>

                <Table.Cell><Link to={"/server/" + this.props.server.ip}>
                    {this.props.server.gm}
                </Link></Table.Cell>

                <Table.Cell><Link to={"/server/" + this.props.server.ip}>
                    {this.props.server.la}
                </Link></Table.Cell>
            </Table.Row>
        )
    }
}

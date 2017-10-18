import * as React from "react";
import { Component } from "react";
import { Table, Icon, Modal, Grid, List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { ServerCore, ipToSlug } from "./interfaces";

interface IServerProps {
    server: ServerCore
    onClick: Function
}

interface IServerState { }

export default class ServerListRow extends Component<IServerProps, IServerState> {
    constructor(props: IServerProps) {
        super(props);
    }

    select(e: any) {
        this.props.onClick(this.props.server.ip)
    }

    render() {
        let passwordIcon = this.props.server.pa ? <Icon name="lock" /> : <Icon name="unlock" disabled />;
        // let link = "/server/" + ipToSlug(this.props.server.ip);

        return (
            <Table.Row onClick={this.select.bind(this)}>
                <Table.Cell>
                    {passwordIcon}{this.props.server.ip}
                </Table.Cell>
                <Table.Cell>
                    {this.props.server.hn}
                </Table.Cell>
                <Table.Cell>
                    {this.props.server.pc}/{this.props.server.pm}
                </Table.Cell>
                <Table.Cell>
                    {this.props.server.gm}
                </Table.Cell>
                <Table.Cell>
                    {this.props.server.la}
                </Table.Cell>
            </Table.Row>
        );
    }
}

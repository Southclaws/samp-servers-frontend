import * as React from "react";
import { Component } from "react";
import { Table, Icon, Modal, Grid, List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { ServerCore, ipToSlug } from "./interfaces";

interface IServerProps {
    server: ServerCore;
}

interface IServerState {}

export default class ServerListRow extends Component<IServerProps, IServerState> {
    render() {
        let passwordIcon = this.props.server.pa ? <Icon name="lock" /> : <Icon name="unlock" disabled />;
        let link = "/server/" + ipToSlug(this.props.server.ip);

        return (
            <Table.Row>
                <Table.Cell>
                    <Link to={link}>
                        {passwordIcon}
                        {this.props.server.ip}
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    <Link to={link}>{this.props.server.hn}</Link>
                </Table.Cell>
                <Table.Cell>
                    <Link to={link}>
                        {this.props.server.pc}/{this.props.server.pm}
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    <Link to={link}>{this.props.server.gm}</Link>
                </Table.Cell>
                <Table.Cell>
                    <Link to={link}>{this.props.server.la}</Link>
                </Table.Cell>
            </Table.Row>
        );
    }
}

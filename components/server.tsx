import * as React from "react";
import { Component } from "react";
import { Table, Icon, Modal, Grid, List, Image } from "semantic-ui-react";

import { ServerCore } from "./interfaces";

interface IServerProps {
    server: ServerCore;
    onClick: Function;
}

interface IServerState {}

export default class ServerListRow extends Component<IServerProps, IServerState> {
    constructor(props: IServerProps) {
        super(props);
    }

    onClick(e: any) {
        this.props.onClick(this.props.server.ip);
    }

    render() {
        let passwordIcon = this.props.server.pa ? <Icon name="lock" /> : <Icon name="unlock" disabled />;

        return (
            <Table.Row>
                <Table.Cell onClick={this.onClick.bind(this)}>
                    {passwordIcon}
                    {this.props.server.ip}
                </Table.Cell>
                <Table.Cell onClick={this.onClick.bind(this)}>{this.props.server.hn}</Table.Cell>
                <Table.Cell onClick={this.onClick.bind(this)}>
                    {this.props.server.pc}/{this.props.server.pm}
                </Table.Cell>
                <Table.Cell onClick={this.onClick.bind(this)}>{this.props.server.gm}</Table.Cell>
                <Table.Cell onClick={this.onClick.bind(this)}>{this.props.server.la}</Table.Cell>
            </Table.Row>
        );
    }
}

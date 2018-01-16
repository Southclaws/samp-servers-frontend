import * as React from "react";
import { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

import { ServerCore } from "./Interfaces";

interface Props {
    server: ServerCore;
    onClick: Function;
}

interface State {}

export default class ServerListRow extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    select() {
        this.props.onClick(this.props.server.ip);
    }

    render() {
        let passwordIcon = this.props.server.pa ? (
            <Icon name="lock" />
        ) : (
            <Icon name="unlock" disabled />
        );
        // let link = "/server/" + ipToSlug(this.props.server.ip);

        return (
            <Table.Row onClick={e => this.select()}>
                <Table.Cell>
                    {passwordIcon}
                    {this.props.server.ip}
                </Table.Cell>
                <Table.Cell>{this.props.server.hn}</Table.Cell>
                <Table.Cell>
                    {this.props.server.pc}/{this.props.server.pm}
                </Table.Cell>
                <Table.Cell>{this.props.server.gm}</Table.Cell>
                <Table.Cell>{this.props.server.la}</Table.Cell>
            </Table.Row>
        );
    }
}

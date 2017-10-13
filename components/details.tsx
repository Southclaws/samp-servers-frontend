import * as React from "react";
import { Component } from "react";
import { Modal, Icon, Grid, List, Table, Image } from "semantic-ui-react";

import ServerListRow from "./server";
import { ServerFull, blankServer } from "./interfaces";

interface IServerDetailsProps {
    fullServer: ServerFull;
    onClose: Function;
}

interface IServerDetailsState {}

export default class ServerDetails extends Component<IServerDetailsProps, IServerDetailsState> {
    render() {
        return (
            <Grid divided="vertically">
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <List>
                            <List.Item>
                                <Icon name="sitemap" />
                                <List.Content>
                                    <List.Header>Address</List.Header>
                                    <List.Description>{this.props.fullServer.core.ip}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Icon name="signal" />
                                <List.Content>
                                    <List.Header>Players</List.Header>
                                    <List.Description>
                                        {this.props.fullServer.core.pc}/{this.props.fullServer.core.pm}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Icon name="game" />
                                <List.Content>
                                    <List.Header>Gamemode</List.Header>
                                    <List.Description>{this.props.fullServer.core.gm}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Icon name="world" />
                                <List.Content>
                                    <List.Header>Language</List.Header>
                                    <List.Description>{this.props.fullServer.core.la}</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        {this.state === null ? (
                            ""
                        ) : (
                            <List>
                                <List.Item>
                                    <Icon name="sitemap" />
                                    <List.Content>
                                        <List.Header>Description</List.Header>
                                        <List.Description>
                                            {this.props.fullServer.description ? this.props.fullServer.description : "(no description given)"}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon name="options" />
                                    <List.Content>
                                        <List.Header>Rules</List.Header>
                                        <List.Description>
                                            {this.props.fullServer.ru ? (
                                                <Table size="small" basic="very" celled compact collapsing>
                                                    <Table.Body>
                                                        {Object.keys(this.props.fullServer.ru).map((v: string, i: number) => {
                                                            return (
                                                                <Table.Row key={i}>
                                                                    <Table.Cell>{v}</Table.Cell>
                                                                    <Table.Cell>{this.props.fullServer.ru[v]}</Table.Cell>
                                                                </Table.Row>
                                                            );
                                                        })}
                                                    </Table.Body>
                                                </Table>
                                            ) : (
                                                "(no rules set)"
                                            )}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>{this.state === null ? "" : <Image src={this.props.fullServer.banner} fluid centered />}</Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

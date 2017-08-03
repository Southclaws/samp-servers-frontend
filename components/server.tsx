import * as React from "react";
import { Component } from "react";
import { Table, Icon, Modal, Grid, List, Image } from 'semantic-ui-react';


interface IServerProps {
    server: ServerCore
}

interface IServerState {
    full: ServerFull
}

export default class ServerListRow extends Component<IServerProps, IServerState> {
    selectServer(e: Event) {
        fetch("http://api.samp.southcla.ws/v1/server/" + this.props.server.ip).then((res) => res.json()).then((data) => {
            this.setState({
                full: data as ServerFull,
            })
        }).catch((err) => console.log('failed to get servers', err))
    }

    render() {
        let passwordIcon = this.props.server.pa ? <Icon name='lock' /> : <Icon name='unlock' disabled />

        return (
            <Modal
                trigger={
                    <Table.Row>
                        <Table.Cell>
                            {passwordIcon}
                            {this.props.server.ip}</Table.Cell>
                        <Table.Cell>{this.props.server.hn}</Table.Cell>
                        <Table.Cell>{this.props.server.pc}/{this.props.server.pm}</Table.Cell>
                        <Table.Cell>{this.props.server.gm}</Table.Cell>
                        <Table.Cell>{this.props.server.la}</Table.Cell>
                    </Table.Row>
                }
                onMount={this.selectServer.bind(this)}>
                <Modal.Header>{this.props.server.hn}  {passwordIcon}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <List>
                                        <List.Item>
                                            <Icon name='sitemap' />
                                            <List.Content>
                                                <List.Header>Address</List.Header>
                                                <List.Description>{this.props.server.ip}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='signal' />
                                            <List.Content>
                                                <List.Header>Players</List.Header>
                                                <List.Description>{this.props.server.pc}/{this.props.server.pm}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='game' />
                                            <List.Content>
                                                <List.Header>Gamemode</List.Header>
                                                <List.Description>{this.props.server.gm}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='world' />
                                            <List.Content>
                                                <List.Header>Language</List.Header>
                                                <List.Description>{this.props.server.la}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column>
                                    {this.state === null ? "" : (
                                        <List>
                                            <List.Item>
                                                <Icon name='sitemap' />
                                                <List.Content>
                                                    <List.Header>Description</List.Header>
                                                    <List.Description>{this.state.full.description ? this.state.full.description : "(no description given)"}</List.Description>
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <Icon name='options' />
                                                <List.Content>
                                                    <List.Header>Rules</List.Header>
                                                    <List.Description>{this.state.full.ru ? (
                                                        <Table size='small' basic='very' celled compact collapsing><Table.Body>{
                                                            (Object.keys(this.state.full.ru).map((v: string, i: number) => {
                                                                console.log(v)
                                                                return (
                                                                    <Table.Row key={i}>
                                                                        <Table.Cell>{v}</Table.Cell>
                                                                        <Table.Cell>{this.state.full.ru[v]}</Table.Cell>
                                                                    </Table.Row>
                                                                )
                                                            }))
                                                        }</Table.Body></Table>
                                                    ) : "(no rules set)"}</List.Description>
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    )}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    {this.state === null ? "" : (
                                        <Image src={this.state.full.banner} fluid centered />
                                    )}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export interface ServerCore {
    ip: string
    hn: string
    pc: number
    pm: number
    gm: string
    la: string
    pa: boolean
}

export interface ServerFull {
    core: ServerCore
    ru: ServerRules
    pl: number
    description: string
    banner: string
}

export interface ServerRules {
    [key: string]: string
}

export function decodeServerCore(obj: any): ServerCore {
    let ret: ServerCore = {
        ip: obj.ip,
        hn: obj.hn,
        pc: obj.pc,
        pm: obj.pm,
        gm: obj.gm,
        la: obj.la,
        pa: obj.pa,
    }

    return ret
}

import * as React from "react";
import { Component } from "react";
import { Table, Icon, Modal } from 'semantic-ui-react';


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
        let passwordIcon = this.props.server.pa ? <Icon name='lock' /> : <Icon name='unlock' />

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
                <Modal.Header>{this.props.server.hn}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>{
                            JSON.stringify(this.state === null ? "No data" : this.state.full)
                        }</p>
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
    ru: {}
    pl: number
    description: string
    banner: string
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

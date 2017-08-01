import * as React from "react";
import { Component } from "react";
import { Table } from 'semantic-ui-react';


interface IServerProps {
    server: ServerCore
}

interface IServerState { }

export default class ServerListRow extends Component<IServerProps, IServerState> {
    selectServer(e: Event) {
        // open the details thingy
    }

    render() {
        return (
            <Table.Row onClick={this.selectServer.bind(this)}>
                <Table.Cell>{this.props.server.ip}</Table.Cell>
                <Table.Cell>{this.props.server.hn}</Table.Cell>
                <Table.Cell>{this.props.server.pc}</Table.Cell>
                <Table.Cell>{this.props.server.pm}</Table.Cell>
                <Table.Cell>{this.props.server.gm}</Table.Cell>
                <Table.Cell>{this.props.server.la}</Table.Cell>
                <Table.Cell>{this.props.server.pa}</Table.Cell>
            </Table.Row>
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

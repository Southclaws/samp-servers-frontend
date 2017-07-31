import * as React from "react";
import { Component } from "react";

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
            <tr onClick={this.selectServer.bind(this)}>
                <td>{this.props.server.ip}</td>
                <td>{this.props.server.hn}</td>
                <td>{this.props.server.pc}</td>
                <td>{this.props.server.pm}</td>
                <td>{this.props.server.gm}</td>
                <td>{this.props.server.la}</td>
                <td>{this.props.server.pa}</td>
            </tr>
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

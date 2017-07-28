import * as React from "react";
import { Component } from "react";

export type ServerCore = {
    ip: string
    hn: string
    pc: number
    pm: number
    gm: string
    la: string
    pa: boolean
}

export type ServerFull = {
    core: ServerCore
    ru: {}
    pl: number
    description: string
    banner: string
}

interface IServerProps {
    server: ServerFull
}

interface IServerState {

}

export default class Server extends Component<IServerProps, IServerState> {
    onClick(e: Event) {
        e.preventDefault();
        // set the selected server to this
        // update details view to GET /server/{this.core.address}
    }
    render() {
        // const active = server === activeServer ? 'active' : '';
        return (
            <li /*className={active}*/>
                <a onClick={this.onClick.bind(this)}>
                    Server
                </a>
            </li>
        )
    }
}

import * as React from "react";
import { Component } from "react";

export class CServerCore {
    ip: string
    hn: string
    pc: number
    mp: number
    gm: string
    la: string
    pa: boolean
}

export class CServer {
    core: CServerCore
    ru: {}
    pl: number
    description: string
    banner: string

    constructor(ip: string,
        hn: string,
        pc: number,
        mp: number,
        gm: string,
        la: string,
        pa: boolean,
        ru: {},
        pl: number,
        description: string,
        banner: string) {
        this.core.hn = hn
        this.core.pc = pc
        this.core.mp = mp
        this.core.gm = gm
        this.core.la = la
        this.core.pa = pa
        this.ru = ru
        this.pl = pl
        this.description = description
        this.banner = banner
    }
}

interface IServerProps {
    server: CServer
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

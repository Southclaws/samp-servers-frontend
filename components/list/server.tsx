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

interface IServerState { }

export default class Server extends Component<IServerProps, IServerState> {
    render() {
        return (
            <li></li>
        )
    }
}

import * as React from "react";
import { Component } from "react";

import { CServer, CServerCore } from "./list/server"
import ServerList from "./list/list"
import ServerDetails from "./details/details"

interface AppState {
    servers: Array<CServerCore>
}

export default class App extends Component<any, AppState> {
    constructor(props: any) {
        super(props)

        this.state = {
            // temp state for now
            servers: [
                // { core: { ip: "ss.southcla.ws", hn: "Scavenge and Survive Official", pc: 4, pm: 32, gm: "Scavenge \u0026 Survive by Southclaws", la: "English", pa: false } },
                // { core: { ip: "198.251.83.150:7777", hn: "AnotherDay Roleplay | AnotherDayRp.com", pc: 19, pm: 100, gm: "AD-RP 1.5", la: "Espa\ufffdol - Latino", pa: false } },
                // { core: { ip: "176.32.39.168:7777", hn: "Malibu RP 3 | Wave | 10lvl 500kk 150k \ufffd\ufffd\ufffd\ufffd\ufffd", pc: 937, pm: 1000, gm: "Role Play | Wave", la: "Russian", pa: false } },
                // { core: { ip: "176.32.39.151:7777", hn: "Malibu RP 2 | Summer | 10lvl 500kk 150k \ufffd\ufffd\ufffd\ufffd\ufffd", pc: 947, pm: 1000, gm: "Role Play | Summer", la: "Russian", pa: false } },
                // { core: { ip: "176.32.39.80:7777", hn: "Europa RP | France | 10lvl 110kk 50k Donate", pc: 911, pm: 999, gm: "Europa RolePlay", la: "Russian", pa: false } },
                // { core: { ip: "176.32.37.26:7777", hn: "Malibu RP 1 | Beach | 10lvl 500kk 150k \ufffd\ufffd\ufffd\ufffd\ufffd", pc: 949, pm: 1000, gm: "Role Play | Beach", la: "Russian", pa: false } },
                // { core: { ip: "176.32.36.91:7777", hn: "Europa RP | Italy | 10lvl 110kk 50k Donate", pc: 906, pm: 999, gm: "Europa RolePlay", la: "Russian", pa: false } }
            ]
        };
    }

    getServers(url: string) {
        fetch(url, {
            method: 'get',
            mode: 'no-cors'
        }).then((res) => res.json()).then((data) => {
            this.setState({
                servers: data,
            })
        }).catch((err) => console.log('failed to get servers'))
    }

    componentDidMount() {
        this.getServers("http://api.samp.southcla.ws/v1/servers")
    }

    render() {
        return (<div>
            {/* <ServerList servers={this.state.servers} /> */}
            <ServerDetails />
        </div>)
    }
}

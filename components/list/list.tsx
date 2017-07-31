import * as React from "react";
import { Component } from "react";
import ServerCore from "./server"
import ServerListRow from "./server"

interface IServerListProps extends React.Props<any> {
    servers: any
}

interface IServerListState {
    selected: string
}

export default class ServerList extends Component<IServerListProps, IServerListState> {
    constructor(props: IServerListProps) {
        super(props)
        this.state = {
            selected: "" // nothing selected on init
        }
    }

    render() {
        return (<table><tbody>{

            this.props.servers.map((server: any, index: number) => {
                return <ServerListRow key={index} server={server} />
            })

        }</tbody></table>)
    }
}

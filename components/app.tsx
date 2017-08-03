import * as React from "react";
import { Component } from "react";
import { Container, Grid, Header, Divider } from 'semantic-ui-react';

import { ServerFull, ServerCore, decodeServerCore } from "./server"
import ServerList from "./list"

interface AppProps { }
interface AppState {
    servers: ServerCore[]
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            servers: []
        };
    }
    getServers(url: string) {
        fetch(url).then((res) => res.json()).then((data) => {
            let servers: ServerCore[] = []
            data.forEach((server: ServerCore) => {
                servers.push(server)
            });
            this.setState({
                servers: servers,
            })
        }).catch((err) => console.log('failed to get servers', err))
    }

    componentDidMount() {
        this.getServers("http://api.samp.southcla.ws/v1/servers")
    }

    render() {
        console.log(this.state)
        if (this.state.servers === null) {
            return (<div></div>)
        }
        return (<Grid>
            <Grid.Row>
                <Container>
                    <Header as='h1' attached='top' inverted>
                        SA:MP Servers
                        <Header.Subheader>
                            by southclaws
                        </Header.Subheader>
                    </Header>
                    <Divider inverted />
                </Container>
            </Grid.Row>
            <Grid.Row>
                <Container>
                    <ServerList servers={this.state.servers} />
                </Container>
            </Grid.Row>
        </Grid>)
    }
}

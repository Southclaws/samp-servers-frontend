import * as React from "react";
import { SyntheticEvent, Component } from "react";
import { Container, Grid, Header, Input, Button, Icon, Divider } from 'semantic-ui-react';

import { ServerFull, ServerCore, decodeServerCore } from "./server"
import ServerList from "./list"

interface AppProps { }
interface AppState {
    servers: ServerCore[]
    searching: boolean
    refreshing: boolean
    adding: boolean
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            servers: [],
            searching: false,
            refreshing: false,
            adding: false
        };
    }
    componentDidMount() {
        this.getServers()
    }

    getServers() {
        fetch("http://api.samp.southcla.ws/v1/servers").then((res) => res.json()).then((data) => {
            let servers: ServerCore[] = []
            data.forEach((server: ServerCore) => {
                servers.push(server)
            });
            this.setState({
                servers: servers,
                refreshing: false
            })
        }).catch((err) => console.log('failed to get servers', err))
    }

    doSearch(event: SyntheticEvent<any>, data: object) {
        this.setState({ searching: true })
        console.log(event, data)
    }

    doRefresh(event: SyntheticEvent<any>, data: object) {
        this.setState({ refreshing: true })
        this.getServers()
    }

    doAddServer(event: SyntheticEvent<any>, data: object) {
        this.setState({ adding: true })
        console.log(event, data)
    }

    render() {
        if (this.state.servers === null) {
            return (<div></div>)
        }
        return (<Container>
            <Grid columns="3" >
                <Grid.Row>
                    <Header as='h1' attached='top' inverted>
                        SA:MP Servers
                        <Header.Subheader>
                            by southclaws
                        </Header.Subheader>
                    </Header>
                    <Divider inverted />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column >
                        <Input
                            inverted
                            fluid
                            iconPosition='left'
                            loading={false}
                            icon='search'
                            placeholder='Search...'
                            action={
                                <Button onClick={this.doSearch.bind(this)} animated='vertical' loading={this.state.searching}>
                                    <Button.Content visible>Search</Button.Content>
                                    <Button.Content hidden >
                                        <Icon name='search' />
                                    </Button.Content>
                                </Button>
                            }
                        />
                    </Grid.Column>
                    <Grid.Column >
                        {/* side note: making the button 'inverted' looks ugly af for some reason... */}
                        <Button onClick={this.doRefresh.bind(this)} fluid animated='vertical' loading={this.state.refreshing}>
                            <Button.Content visible>Refresh</Button.Content>
                            <Button.Content hidden >
                                <Icon name='refresh' />
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                    <Grid.Column >
                        <Input
                            inverted
                            fluid
                            iconPosition='left'
                            loading={false}
                            icon='sitemap'
                            placeholder='Paste a server address'
                            action={
                                <Button onClick={this.doAddServer.bind(this)} animated='vertical' loading={this.state.adding}>
                                    <Button.Content visible>Add</Button.Content>
                                    <Button.Content hidden >
                                        <Icon name='plus' />
                                    </Button.Content>
                                </Button>
                            }
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <ServerList servers={this.state.servers} />
                </Grid.Row>
            </Grid>
        </Container>
        )
    }
}

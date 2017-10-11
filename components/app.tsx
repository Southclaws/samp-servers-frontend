import * as URL from 'url'
import * as React from "react";
import { Route } from 'react-router-dom';
import { SyntheticEvent, Component } from "react";
import { Container, Segment, Grid, Header, List, Input, Button, Popup, Icon, Divider, Statistic, Image, Modal } from 'semantic-ui-react';
import Device from 'react-device'

import { ServerFull, ServerCore, decodeServerCore } from "./interfaces"
import ServerList from "./list"

interface AppProps { }
interface AppState {
    servers: ServerCore[]
    searching: boolean
    refreshing: boolean
    adding: boolean
    searchQuery: string
    addAddress: string
    addSuccess: boolean
    isMobile: boolean
    clientButton: string
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        let clientButtonText = [
            "SA:MP Client Not Good Enough?",
            "Try a Modern SA:MP Client Today",
            "Are You Still Using The Default Client?",
        ]

        this.state = {
            servers: [],
            searching: false,
            refreshing: false,
            adding: false,
            searchQuery: "",
            addAddress: "",
            addSuccess: false,
            isMobile: false,
            clientButton: clientButtonText[Math.floor(Math.random() * clientButtonText.length)],
        };
    }
    componentDidMount() {
        this.getServers()
    }

    async getServers() {
        let response: Response
        try {
            response = await fetch("http://api.samp.southcla.ws/v2/servers")
        } catch (error) {
            console.log("failed to GET server list:", error)
            return
        }

        let data: Array<Object>
        try {
            data = await response.json()
        } catch (error) {
            console.log("failed to parse response as JSON:", error)
            return
        }

        let servers: ServerCore[] = []
        data.forEach((server: ServerCore) => {
            servers.push(server)
        });

        this.setState({
            servers: servers,
            refreshing: false,
            searching: false
        })
    }

    doFilter(query: string) {
        this.setState({ searchQuery: query })
    }
    doAdd(address: string) {
        this.setState({ addAddress: address })
    }

    doSearch(event: SyntheticEvent<any>, data: object) {
        this.setState({ searching: true })
        this.getServers() // temp until v2 API is implemented
    }

    doRefresh(event: SyntheticEvent<any>, data: object) {
        this.setState({ refreshing: true })
        this.getServers()
    }

    async doAddServer(event: SyntheticEvent<any>, data: object) {
        if (this.state.addAddress.length < 3) {
            return
        }

        this.setState({ adding: true })

        let response: Response
        try {
            response = await fetch('http://api.samp.southcla.ws/v2/server', {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/plain',
                },
                body: this.state.addAddress
            })
        } catch (error) {
            console.log("failed to POST server:", error)
            return
        }

        if (response.status != 200) {
            console.log("server POST response not OK:", response.status)
            return
        }

        this.setState({
            adding: false,
            addSuccess: true,
            addAddress: ""
        })
        setTimeout(() => { this.setState({ addSuccess: false }) }, 2500)
    }

    onDeviceChange(deviceInfo: any) {
        if (deviceInfo.screen.width < 768 && !this.state.isMobile) {
            this.setState({ isMobile: true })
        } else {
            this.setState({ isMobile: false })
        }
    }

    render() {
        if (this.state.servers === null) {
            return (<div></div>)
        }

        let numServers = this.state.servers.length
        let numPlayers = 0
        this.state.servers.forEach(s => {
            numPlayers += s.pc
        });

        return (<Container>
            <Device onChange={this.onDeviceChange.bind(this)} />
            <Grid padded>
                <Grid.Row columns="2">
                    <Grid.Column width='6' >
                        <Grid stackable container columns="1" padded>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header size='huge' as='h1' inverted>SA:MP Servers
                                    <Header.Subheader>by southclaws</Header.Subheader>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Grid.Column width='10' >
                                    <Modal size="fullscreen" trigger={<Button color="blue" size="large">{this.state.clientButton}</Button>}>
                                        <Modal.Header>Advanced Server Browser</Modal.Header>
                                        <Modal.Content image>
                                            <Image wrapped size='massive' src="https://i.imgur.com/78i7MbM.png" />
                                            {/* <Image wrapped size='massive' src="https://i.imgur.com/o6hAFAx.png" />
                                            <Image wrapped size='massive' src="https://i.imgur.com/hkTck4d.png" />
                                            <Image wrapped size='massive' src="https://i.imgur.com/uijZ3ZG.png" />
                                            <Image wrapped size='massive' src="https://i.imgur.com/rmtqjfJ.png" />
                                            <Image wrapped size='massive' src="https://i.imgur.com/TN6UnJ7.png" />
                                            <Image wrapped size='massive' src="https://i.imgur.com/rum16VT.png" />
                                            <Image wrapped size='massive' src="https://i.imgur.com/vFqytVY.png" /> */}
                                            <Modal.Description >
                                                <Header>Advanced Server Browser</Header>
                                                <Container text>
                                                    This application allows you to view a vast amount of SA-MP servers, filter them, save them as your favourites and play on them. You won't loose your original favourites, since those will be taken over. Also it includes a SA-MP version changer, access to SA-MP legacy settings, screenshots and chatlogs.
                                                </Container>
                                                <Divider />
                                                <a href="https://github.com/Bios-Marcel/ServerBrowser/releases/download/1.3.5/ServerBrowser-1.3.5-Installer.exe">
                                                    <Button color="green" size="large">Download Now</Button>
                                                </a>
                                                <Divider />
                                                <a href="https://github.com/Bios-Marcel/ServerBrowser/">
                                                    <Button color="blue" size="large">Source Code</Button>
                                                </a>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column >
                    <Grid.Column >
                        <Grid stackable container columns="3" padded>
                            <Grid.Row>
                                <Grid.Column >
                                    <Statistic label='Players' value={numPlayers} inverted />
                                </Grid.Column >
                                {this.state.isMobile ? (null) :
                                    (<Grid.Column >
                                        <Divider vertical inverted>on</Divider>
                                    </Grid.Column >)
                                }
                                <Grid.Column >
                                    <Statistic label='Servers' value={numServers} inverted />
                                </Grid.Column >
                            </Grid.Row>
                            <Grid.Row centered>
                                <Grid.Column >
                                    <Statistic size="mini" label='Players per Server' value={(numPlayers / numServers).toFixed(1)} inverted />
                                </Grid.Column >
                            </Grid.Row>
                        </Grid>
                    </Grid.Column >
                </Grid.Row>
                <Divider inverted />
                <Grid.Row columns="3">
                    <Grid.Column >
                        <Input
                            inverted
                            fluid
                            iconPosition='left'
                            loading={false}
                            icon='search'
                            placeholder='Search...'
                            onChange={(e: any) => this.doFilter(e.target.value)}
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
                            value={this.state.addAddress}
                            inverted
                            fluid
                            iconPosition='left'
                            loading={this.state.adding}
                            icon='sitemap'
                            placeholder='Paste a server address'
                            onChange={(e: any) => this.doAdd(e.target.value)}
                            action={
                                <Popup
                                    content='Added! The server may take a minute or two to appear on the list.'
                                    open={this.state.addSuccess}
                                    hideOnScroll
                                    trigger={<Button onClick={this.doAddServer.bind(this)} animated='vertical' loading={this.state.adding}>
                                        <Button.Content visible>Add</Button.Content>
                                        <Button.Content hidden >
                                            <Icon name='plus' />
                                        </Button.Content>
                                    </Button>}
                                />
                            }
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                    <ServerList
                        servers={this.state.servers}
                        filter={this.state.searchQuery} />
                </Grid.Row>
            </Grid>
        </Container >
        )
    }
}

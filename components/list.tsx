import * as React from "react";
import { Component, SyntheticEvent } from "react";
import { Table, Segment, Grid, Header, List, Input, Button, Popup, Icon, Divider, Statistic, Image, Modal } from "semantic-ui-react";
import * as Fuse from "fuse.js";

import { ServerCore, ServerFull } from "./interfaces";
import ServerListRow from "./server";
import ServerModal from "./details-modal";

interface IServerListProps {}

interface IServerListState {
    filter: string;
    servers: ServerCore[];
    searching: boolean;
    refreshing: boolean;
    adding: boolean;
    searchQuery: string;
    addAddress: string;
    addSuccess: boolean;
    selected: ServerCore;
}

export default class ServerList extends Component<IServerListProps, IServerListState> {
    constructor(props: IServerListProps) {
        super(props);
        this.state = {
            filter: "",
            servers: [],
            searching: false,
            refreshing: false,
            adding: false,
            searchQuery: "",
            addAddress: "",
            addSuccess: false,
            selected: null
        };
    }

    componentDidMount() {
        this.getServers();
    }

    async getServers() {
        let response: Response;
        try {
            response = await fetch("http://api.samp.southcla.ws/v2/servers");
        } catch (error) {
            console.log("failed to GET server list:", error);
            return;
        }

        let data: Array<Object>;
        try {
            data = await response.json();
        } catch (error) {
            console.log("failed to parse response as JSON:", error);
            return;
        }

        let servers: ServerCore[] = [];
        data.forEach((server: ServerCore) => {
            servers.push(server);
        });

        this.setState({
            servers: servers,
            refreshing: false,
            searching: false
        });
    }

    async doAddServer(event: SyntheticEvent<any>, data: object) {
        if (this.state.addAddress.length < 3) {
            return;
        }

        this.setState({ adding: true });

        let response: Response;
        try {
            response = await fetch("http://api.samp.southcla.ws/v2/server", {
                method: "POST",
                headers: {
                    Accept: "text/plain",
                    "Content-Type": "text/plain"
                },
                body: this.state.addAddress
            });
        } catch (error) {
            console.log("failed to POST server:", error);
            return;
        }

        if (response.status != 200) {
            console.log("server POST response not OK:", response.status);
            return;
        }

        this.setState({
            adding: false,
            addSuccess: true,
            addAddress: ""
        });
        setTimeout(() => {
            this.setState({ addSuccess: false });
        }, 2500);
    }

    doFilter(query: string) {
        this.setState({ searchQuery: query });
    }
    doAdd(address: string) {
        this.setState({ addAddress: address });
    }

    doSearch(event: SyntheticEvent<any>, data: object) {
        this.setState({ searching: true });
        this.getServers(); // temp until v2 API is implemented
    }

    doRefresh(event: SyntheticEvent<any>, data: object) {
        this.setState({ refreshing: true });
        this.getServers();
    }

    async select(server: ServerCore) {
        this.setState({
            selected: server
        });
    }

    async unSelect() {
        this.setState({
            selected: null
        });
    }

    render() {
        if (this.state.servers === null) {
            return (
                <div>
                    <p>The samp-servers.net API is currently unavailable.</p>
                </div>
            );
        }

        let servers: Array<ServerCore>;

        if (this.state.filter != "") {
            let fuse = new Fuse(this.state.servers, {
                shouldSort: true,
                threshold: 0.4,
                location: 0,
                distance: 25,
                maxPatternLength: 32,
                minMatchCharLength: 2,
                keys: ["ip", "hn", "gm", "la"]
            });
            servers = fuse.search<ServerCore>(this.state.filter);
        } else {
            servers = this.state.servers;
        }

        let renderModal = <div />;

        if (this.state != null) {
            if (this.state.selected != null) {
                renderModal = <ServerModal selectedAddress={this.state.selected.ip} onClose={this.unSelect.bind(this)} />;
            }
        }

        return (
            <div>
                {renderModal}
                <Grid>
                    <Grid.Row columns="3">
                        <Grid.Column>
                            <Input
                                inverted
                                fluid
                                iconPosition="left"
                                loading={false}
                                icon="search"
                                placeholder="Search..."
                                onChange={(e: any) => this.doFilter(e.target.value)}
                                action={
                                    <Button onClick={this.doSearch.bind(this)} animated="vertical" loading={this.state.searching}>
                                        <Button.Content visible>Search</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="search" />
                                        </Button.Content>
                                    </Button>
                                }
                            />
                        </Grid.Column>
                        <Grid.Column>
                            {/* side note: making the button 'inverted' looks ugly af for some reason... */}
                            <Button onClick={this.doRefresh.bind(this)} fluid animated="vertical" loading={this.state.refreshing}>
                                <Button.Content visible>Refresh</Button.Content>
                                <Button.Content hidden>
                                    <Icon name="refresh" />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Input
                                value={this.state.addAddress}
                                inverted
                                fluid
                                iconPosition="left"
                                loading={this.state.adding}
                                icon="sitemap"
                                placeholder="Paste a server address"
                                onChange={(e: any) => this.doAdd(e.target.value)}
                                action={
                                    <Popup
                                        content="Added! The server may take a minute or two to appear on the list."
                                        open={this.state.addSuccess}
                                        hideOnScroll
                                        trigger={
                                            <Button onClick={this.doAddServer.bind(this)} animated="vertical" loading={this.state.adding}>
                                                <Button.Content visible>Add</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="plus" />
                                                </Button.Content>
                                            </Button>
                                        }
                                    />
                                }
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="1">
                        <Table celled inverted selectable size="small">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Address</Table.HeaderCell>
                                    <Table.HeaderCell>Hostname</Table.HeaderCell>
                                    <Table.HeaderCell>Players</Table.HeaderCell>
                                    <Table.HeaderCell>Gamemode</Table.HeaderCell>
                                    <Table.HeaderCell>Language</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {servers.map((server: any, index: number) => {
                                    return <ServerListRow key={index} server={server} onClick={this.select.bind(this)} />;
                                })}
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

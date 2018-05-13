import * as React from "react";
import { Switch, Route, Link, RouteComponentProps } from "react-router-dom";
import { Table, Grid, Input, Button, Popup, Icon } from "semantic-ui-react";
import * as Fuse from "fuse.js";

import { ServerCore } from "./Interfaces";
import ServerModal from "./DetailsModal";

interface Props {}

interface State {
    // filter: string;
    servers: ServerCore[];
    searching: boolean;
    refreshing: boolean;
    adding: boolean;
    searchQuery: string;
    addAddress: string;
    addSuccess: boolean;
}

export default class ServerList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            // filter: "",
            servers: [],
            searching: false,
            refreshing: false,
            adding: false,
            searchQuery: "",
            addAddress: "",
            addSuccess: false
        };
    }

    componentDidMount() {
        this.getServers();
    }

    async getServers() {
        let response: Response;
        try {
            response = await fetch("https://api.samp-servers.net/v2/servers");
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

    async doAddServer() {
        if (this.state.addAddress.length < 3) {
            return;
        }

        this.setState({ adding: true });

        let response: Response;
        try {
            response = await fetch("https://api.samp-servers.net/v2/server", {
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

        if (response.status !== 200) {
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

    doSearchQuery(query: string) {
        this.setState({ searchQuery: query });
    }
    doAdd(address: string) {
        this.setState({ addAddress: address });
    }

    doSearch() {
        this.setState({ searching: true });
        this.getServers(); // temp until v2 API is implemented
    }

    doRefresh() {
        this.setState({ refreshing: true });
        this.getServers();
    }

    renderServerRow(server: ServerCore, index: number) {
        let passwordIcon = server.pa ? (
            <Icon name="lock" />
        ) : (
            <Icon name="unlock" disabled />
        );
        return (
            <Table.Row key={index}>
                <Table.Cell>
                    <Link to={"/server/" + server.ip}>
                        {passwordIcon}
                        {server.ip}
                    </Link>
                </Table.Cell>
                <Table.Cell>{server.hn}</Table.Cell>
                <Table.Cell>
                    {server.pc}/{server.pm}
                </Table.Cell>
                <Table.Cell>{server.gm}</Table.Cell>
                <Table.Cell>{server.la}</Table.Cell>
            </Table.Row>
        );
    }

    render() {
        console.log("rendering with ", this.state);
        if (this.state.servers === null) {
            return (
                <div>
                    <p>The samp-servers.net API is currently unavailable.</p>
                </div>
            );
        }

        let servers: Array<ServerCore>;

        if (this.state.searchQuery !== "") {
            let fuse = new Fuse(this.state.servers, {
                shouldSort: true,
                threshold: 0.4,
                location: 0,
                distance: 25,
                maxPatternLength: 32,
                minMatchCharLength: 2,
                keys: ["ip", "hn", "gm", "la"]
            });
            servers = fuse.search<ServerCore>(this.state.searchQuery);
        } else {
            servers = this.state.servers;
        }

        return (
            <div>
                <Switch>
                    <Route path="/server/:address">
                        {(
                            thisProps: RouteComponentProps<{
                                address: string;
                            }>
                        ) => {
                            return (
                                <ServerModal
                                    selectedAddress={
                                        thisProps.match.params.address
                                    }
                                    onClose={() => {
                                        thisProps.history.push("/");
                                    }}
                                />
                            );
                        }}
                    </Route>
                </Switch>

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
                                onChange={e => {
                                    this.doSearchQuery(
                                        (e.target as HTMLInputElement).value
                                    );
                                }}
                                action={
                                    <Button
                                        onClick={e => this.doSearch()}
                                        animated="vertical"
                                        loading={this.state.searching}
                                    >
                                        <Button.Content visible>
                                            Search
                                        </Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="search" />
                                        </Button.Content>
                                    </Button>
                                }
                            />
                        </Grid.Column>
                        <Grid.Column>
                            {/* side note: making the button 'inverted' looks ugly af for some reason... */}
                            <Button
                                onClick={e => this.doRefresh()}
                                fluid
                                animated="vertical"
                                loading={this.state.refreshing}
                            >
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
                                onChange={e =>
                                    this.doAdd(
                                        (e.target as HTMLInputElement).value
                                    )
                                }
                                action={
                                    <Popup
                                        content="Added! The server may take a minute or two to appear on the list."
                                        open={this.state.addSuccess}
                                        hideOnScroll
                                        trigger={
                                            <Button
                                                onClick={e =>
                                                    this.doAddServer()
                                                }
                                                animated="vertical"
                                                loading={this.state.adding}
                                            >
                                                <Button.Content visible>
                                                    Add
                                                </Button.Content>
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
                                    <Table.HeaderCell>
                                        Hostname
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Players</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Gamemode
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Language
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {servers.map(
                                    (server: ServerCore, index: number) =>
                                        this.renderServerRow(server, index)
                                )}
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

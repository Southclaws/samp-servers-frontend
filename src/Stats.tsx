import * as React from "react";
import { Component } from "react";
import { Grid, Divider, Statistic } from "semantic-ui-react";

import { Statistics } from "./Interfaces";

interface Ptops {}
interface State {
    statistics: Statistics;
}

export default class Stats extends Component<Ptops, State> {
    constructor(props: Ptops) {
        super(props);
    }

    componentDidMount() {
        this.getStatistics();
    }

    async getStatistics() {
        let response: Response;
        try {
            response = await fetch("//api.samp-servers.net/v2/stats");
        } catch (error) {
            console.log("failed to GET stats:", error);
            return;
        }

        let data: Statistics;
        try {
            data = (await response.json()) as Statistics;
        } catch (error) {
            console.log("failed to parse response as JSON:", error);
            return;
        }

        this.setState({
            statistics: data
        });
    }

    render() {
        let numServers = 0;
        let numPlayers = 0;
        if (this.state != null) {
            numServers = this.state.statistics.servers;
            numPlayers = this.state.statistics.players;
        }

        return (
            <Grid stackable container columns="3" padded>
                <Grid.Row>
                    <Grid.Column>
                        <Statistic
                            label="Players"
                            value={numPlayers}
                            inverted
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Divider vertical inverted>
                            on
                        </Divider>
                    </Grid.Column>
                    <Grid.Column>
                        <Statistic
                            label="Servers"
                            value={numServers}
                            inverted
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <Statistic
                            size="mini"
                            label="Players per Server"
                            value={(numPlayers / numServers).toFixed(1)}
                            inverted
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

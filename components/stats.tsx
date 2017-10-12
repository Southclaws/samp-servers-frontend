import * as URL from "url";
import * as React from "react";
import { Route } from "react-router-dom";
import { SyntheticEvent, Component } from "react";
import { Container, Segment, Grid, Header, List, Input, Button, Popup, Icon, Divider, Statistic, Image, Modal } from "semantic-ui-react";
import Device from "react-device";
import { Statistics, decodeStatistics } from "./interfaces";

interface StatsProps {
    isMobile: boolean;
}
interface StatsState {
    statistics: Statistics;
}

export default class Stats extends Component<StatsProps, StatsState> {
    constructor(props: StatsProps) {
        super(props);
    }

    componentDidMount() {
        this.getStatistics();
    }

    async getStatistics() {
        let response: Response;
        try {
            response = await fetch("http://api.samp.southcla.ws/v2/stats");
        } catch (error) {
            console.log("failed to GET stats:", error);
            return;
        }

        let data: Object;
        try {
            data = await response.json();
        } catch (error) {
            console.log("failed to parse response as JSON:", error);
            return;
        }

        this.setState({
            statistics: decodeStatistics(data)
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
                        <Statistic label="Players" value={numPlayers} inverted />
                    </Grid.Column>
                    {this.props.isMobile ? null : (
                        <Grid.Column>
                            <Divider vertical inverted>
                                on
                            </Divider>
                        </Grid.Column>
                    )}
                    <Grid.Column>
                        <Statistic label="Servers" value={numServers} inverted />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <Statistic size="mini" label="Players per Server" value={(numPlayers / numServers).toFixed(1)} inverted />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

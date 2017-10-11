import * as URL from 'url'
import * as React from "react";
import { Route } from 'react-router-dom';
import { SyntheticEvent, Component } from "react";
import { Container, Segment, Grid, Header, List, Input, Button, Popup, Icon, Divider, Statistic, Image, Modal } from 'semantic-ui-react';
import Device from 'react-device'


interface StatsProps {
    isMobile: boolean
}
interface StatsState {
    clientButton: string
}

export default class Stats extends Component<StatsProps, StatsState> {
    constructor(props: StatsProps) {
        super(props)
    }

    render() {
        let numServers = NaN // todo: /v2/stats call
        let numPlayers = NaN

        return (<Grid stackable container columns="3" padded>
            <Grid.Row>
                <Grid.Column >
                    <Statistic label='Players' value={numPlayers} inverted />
                </Grid.Column >
                {this.props.isMobile ? (null) :
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
        </Grid>)
    }
}
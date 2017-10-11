import * as URL from 'url'
import * as React from "react";
import { Route } from 'react-router-dom';
import { SyntheticEvent, Component } from "react";
import { Container, Segment, Grid, Header, List, Input, Button, Popup, Icon, Divider, Statistic, Image, Modal } from 'semantic-ui-react';
import Device from 'react-device'

import Clients from './clients'

interface InfoProps { }
interface InfoState { }

export default class Info extends Component<InfoProps, InfoState> {
    render() {
        return (<Grid stackable container columns="1" padded>
            <Grid.Row>
                <Grid.Column>
                    <Header size='huge' as='h1' inverted>SA:MP Servers
                        <Header.Subheader>by southclaws</Header.Subheader>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column width='10' >
                    <Clients />
                </Grid.Column>
            </Grid.Row>
        </Grid>)
    }
}
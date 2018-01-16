import * as React from "react";
import { Component } from "react";
import { Grid, Header } from "semantic-ui-react";

import Clients from "./Clients";

interface InfoProps {}
interface InfoState {}

export default class Info extends Component<InfoProps, InfoState> {
    render() {
        return (
            <Grid stackable container columns="1" padded>
                <Grid.Row>
                    <Grid.Column>
                        <Header size="huge" as="h1" inverted>
                            SA:MP Servers
                            <Header.Subheader>by southclaws</Header.Subheader>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered={true}>
                    <Grid.Column width="10">
                        <Clients />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

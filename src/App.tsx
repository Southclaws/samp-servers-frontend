import * as React from "react";
import { Component } from "react";
import { Container, Grid, Divider } from "semantic-ui-react";

import Info from "./Info";
import Stats from "./Stats";
import ServerList from "./List";

interface Props {}
interface State {}

export default class App extends Component<Props, State> {
    render() {
        return (
            <Container>
                <Grid padded>
                    <Grid.Row columns="2">
                        <Grid.Column width="6">
                            <Info />
                        </Grid.Column>
                        <Grid.Column>
                            <Stats />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Divider inverted={true} />
                        <ServerList />
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

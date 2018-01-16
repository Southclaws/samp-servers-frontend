import * as React from "react";
import { Switch, Route } from "react-router-dom";
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
                        <Divider inverted />
                        <Switch>
                            <Route exact path="/" component={ServerList} />
                            <Route exact path="/server" component={ServerList} />
                            <Route path="/server/:address" component={ServerList} />
                        </Switch>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

import * as URL from "url";
import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Component } from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import Device from "react-device";

import { ServerFull, ServerCore, decodeServerCore } from "./interfaces";
import Info from "./info";
import Stats from "./stats";
import ServerList from "./list";

interface AppProps {}
interface AppState {
    isMobile: boolean;
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            isMobile: false
        };
    }

    onDeviceChange(deviceInfo: any) {
        if (deviceInfo.screen.width < 768 && !this.state.isMobile) {
            this.setState({ isMobile: true });
        } else {
            this.setState({ isMobile: false });
        }
    }

    render() {
        return (
            <Container>
                <Device onChange={this.onDeviceChange.bind(this)} />
                <Grid padded>
                    <Grid.Row columns="2">
                        <Grid.Column width="6">
                            <Info />
                        </Grid.Column>
                        <Grid.Column>
                            <Stats isMobile={this.state.isMobile} />
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

import * as React from "react";
import { Component } from "react";
import { List } from "semantic-ui-react";

export class Details extends Component {
    render() {
        return (
            <List relaxed>
                <List.Item>
                    <List.Content>
                        <List.Header as='a'>Hostname</List.Header>
                        <List.Description>todo...</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header as='a'>Address</List.Header>
                        <List.Description>todo...</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header as='a'>Gamemode</List.Header>
                        <List.Description>todo...</List.Description>
                    </List.Content>
                </List.Item>
            </List>

        )
    }
}

export default Details
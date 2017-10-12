import * as React from "react";
import { Component } from "react";
import { Modal, Icon, Grid, List, Table, Image } from 'semantic-ui-react';

import ServerListRow from "./server"
import { ServerCore, ServerFull, blankServer } from "./interfaces"


interface IServerDetailsProps {
    selected: string
    onClose: Function
}

interface IServerDetailsState {
    full: ServerFull
}

export default class ServerDetails extends Component<IServerDetailsProps, IServerDetailsState> {
    constructor(props: IServerDetailsProps) {
        super(props)
        this.props = {
            selected: props.selected,
            onClose: props.onClose,
        }
    }

    async load(server: string) {
        let response: Response
        try {
            response = await fetch("http://api.samp.southcla.ws/v2/server/" + server)
        } catch (error) {
            console.log("failed to GET server:", error)
            return
        }

        if (response.status != 200) {
            console.log("failed to GET server:", response.status)
            return
        }

        let data: ServerFull
        try {
            data = await response.json()
        } catch (error) {
            console.log("failed to parse response as JSON:", error)
            return
        }

        this.setState({ full: data })
    }

    render() {
        if (this.props.selected == null) {
            return null
        }

        let full: ServerFull

        if (this.state == null) {
            this.load(this.props.selected)
            full = blankServer()
        } else {
            full = this.state.full
        }

        let passwordIcon = full.core.pa ? <Icon name='lock' /> : <Icon name='unlock' disabled />

        return (<Modal open closeOnDimmerClick closeOnDocumentClick closeIcon onClose={this.props.onClose.bind(this)}>
            <Modal.Header>{full.core.hn}  {passwordIcon}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <List>
                                    <List.Item>
                                        <Icon name='sitemap' />
                                        <List.Content>
                                            <List.Header>Address</List.Header>
                                            <List.Description>{full.core.ip}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <Icon name='signal' />
                                        <List.Content>
                                            <List.Header>Players</List.Header>
                                            <List.Description>{full.core.pc}/{full.core.pm}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <Icon name='game' />
                                        <List.Content>
                                            <List.Header>Gamemode</List.Header>
                                            <List.Description>{full.core.gm}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <Icon name='world' />
                                        <List.Content>
                                            <List.Header>Language</List.Header>
                                            <List.Description>{full.core.la}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column>
                                {this.state === null ? "" : (
                                    <List>
                                        <List.Item>
                                            <Icon name='sitemap' />
                                            <List.Content>
                                                <List.Header>Description</List.Header>
                                                <List.Description>{full.description ? full.description : "(no description given)"}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='options' />
                                            <List.Content>
                                                <List.Header>Rules</List.Header>
                                                <List.Description>{full.ru ? (
                                                    <Table size='small' basic='very' celled compact collapsing><Table.Body>{
                                                        (Object.keys(full.ru).map((v: string, i: number) => {
                                                            return (
                                                                <Table.Row key={i}>
                                                                    <Table.Cell>{v}</Table.Cell>
                                                                    <Table.Cell>{full.ru[v]}</Table.Cell>
                                                                </Table.Row>
                                                            )
                                                        }))
                                                    }</Table.Body></Table>
                                                ) : "(no rules set)"}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.state === null ? "" : (
                                    <Image src={full.banner} fluid centered />
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
        </Modal>
        )
    }
}

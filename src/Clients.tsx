import * as React from "react";
import { Component } from "react";
import { Container, Header, Button, Divider, Modal } from "semantic-ui-react";
import { List } from "semantic-ui-react";

interface ClientsProps {}
interface ClientsState {
    clientButton: string;
}

export default class Clients extends Component<ClientsProps, ClientsState> {
    constructor(props: ClientsProps) {
        super(props);
        let clientButtonText = [
            "SA:MP Client Not Good Enough?",
            "Try a Modern SA:MP Client Today",
            "Are You Still Using The Default Client?"
        ];

        this.state = {
            clientButton: clientButtonText[Math.floor(Math.random() * clientButtonText.length)]
        };
    }

    render() {
        return (
            <Modal
                size="fullscreen"
                trigger={
                    <Button color="blue" size="large">
                        {this.state.clientButton}
                    </Button>
                }
            >
                <Modal.Header>Advanced Server Browser</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <List>
                            <List.Item>
                                <Header>Advanced Server Browser</Header>
                                <Container text>
                                    This application allows you to view a vast amount of SA-MP
                                    servers, filter them, save them as your favourites and play on
                                    them. You won't loose your original favourites, since those will
                                    be taken over. Also it includes a SA-MP version changer, access
                                    to SA-MP legacy settings, screenshots and chatlogs.
                                </Container>
                                <Divider />
                                <a
                                    target="_blank"
                                    href="https://github.com/Bios-Marcel/ServerBrowser/releases/"
                                >
                                    <Button color="green" size="large">
                                        Download Now
                                    </Button>
                                </a>
                                <Divider />
                                <a
                                    target="_blank"
                                    href="https://github.com/Bios-Marcel/ServerBrowser/"
                                >
                                    <Button color="blue" size="large">
                                        Source Code
                                    </Button>
                                </a>
                            </List.Item>
                        </List>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

import * as React from "react";
import { Component } from "react";
import { Modal, Icon } from "semantic-ui-react";

import { ServerFull, blankServer } from "./Interfaces";
import ServerDetails from "./Details";

interface Props {
    selectedAddress: string;
    onClose: Function;
}

interface State {
    full: ServerFull;
}

export default class ServerModal extends Component<Props, State> {
    async load(address: string) {
        let response: Response;
        try {
            response = await fetch(
                "//api.samp-servers.net/v2/server/" + address
            );
        } catch (error) {
            console.log("failed to GET server:", error);
            return;
        }

        if (response.status !== 200) {
            console.log("failed to GET server:", response.status);
            return;
        }

        let data: ServerFull;
        try {
            data = await response.json();
        } catch (error) {
            console.log("failed to parse response as JSON:", error);
            return;
        }

        this.setState({ full: data });
    }

    render() {
        if (this.props.selectedAddress == null) {
            console.log("no address selected");
            return null;
        }

        let full: ServerFull;

        if (this.state == null) {
            this.load(this.props.selectedAddress);
            full = blankServer();
        } else {
            full = this.state.full;
        }

        let passwordIcon = full.core.pa ? (
            <Icon name="lock" />
        ) : (
            <Icon name="unlock" disabled />
        );

        return (
            <Modal
                open
                closeOnDimmerClick
                closeOnEscape
                onClose={() => {
                    console.log("closing");
                    this.props.onClose();
                }}
            >
                <Modal.Header>
                    {full.core.hn} {passwordIcon}
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <ServerDetails server={full} />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

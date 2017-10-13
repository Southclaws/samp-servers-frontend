import * as React from "react";
import { Component } from "react";
import { Modal, Icon, Grid, List, Table, Image } from "semantic-ui-react";

import ServerListRow from "./server";
import { ServerCore, ServerFull, blankServer } from "./interfaces";
import ServerDetails from "./details";

interface IServerModalProps {
    selectedAddress: string;
    onClose: Function;
}

interface IServerModalState {
    full: ServerFull;
}

export default class ServerModal extends Component<IServerModalProps, IServerModalState> {
    constructor(props: IServerModalProps) {
        super(props);
        this.props = {
            selectedAddress: props.selectedAddress,
            onClose: props.onClose
        };
    }

    async load(address: string) {
        let response: Response;
        try {
            response = await fetch("http://api.samp.southcla.ws/v2/server/" + address);
        } catch (error) {
            console.log("failed to GET server:", error);
            return;
        }

        if (response.status != 200) {
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
            return null;
        }

        let full: ServerFull;

        if (this.state == null) {
            this.load(this.props.selectedAddress);
            full = blankServer();
        } else {
            full = this.state.full;
        }

        let passwordIcon = full.core.pa ? <Icon name="lock" /> : <Icon name="unlock" disabled />;

        return (
            <Modal open closeOnDimmerClick closeOnDocumentClick closeIcon onClose={this.props.onClose.bind(this)}>
                <Modal.Header>
                    {full.core.hn} {passwordIcon}
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <ServerDetails onClose={this.props.onClose.bind(this)} server={full} />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

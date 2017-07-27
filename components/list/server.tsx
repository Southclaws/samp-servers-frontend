import * as React from "react";
import { Component } from "react";

class Server extends Component {
    onClick(e: Event) {
        e.preventDefault();
        // set the selected server to this
        // update details view to GET /server/{this.core.address}
    }
    render() {
        // const active = server === activeServer ? 'active' : '';
        return (
            <li /*className={active}*/>
                <a onClick={this.onClick.bind(this)}>
                    Server
                </a>
            </li>
        )
    }
}

export default Server

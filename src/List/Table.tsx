import * as React from "react";
import { Link } from "react-router-dom";
import * as Fuse from "fuse.js";

import { ServerCore } from "./Server";

interface Props {
  query: string;
}

interface State {
  servers: ServerCore[];
}

export default class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      servers: []
    };
  }

  componentDidMount() {
    this.getServers();
  }

  async getServers() {
    let response: Response;
    try {
      response = await fetch("//api.samp-servers.net/v2/servers");
    } catch (error) {
      console.log("failed to GET server list:", error);
      return;
    }

    let data: Array<Object>;
    try {
      data = await response.json();
    } catch (error) {
      console.log("failed to parse response as JSON:", error);
      return;
    }

    let servers: ServerCore[] = [];
    data.forEach((server: ServerCore) => {
      servers.push(server);
    });

    this.setState({
      servers: servers
    });
  }

  renderServerRow(server: ServerCore, index: number): JSX.Element {
    let passwordIcon = server.pa ? <span className="locked" /> : <span className="unlocked" />;
    return (
      <tr key={index}>
        <td>
          <Link to={"/server/" + server.ip}>
            {passwordIcon}
            {server.ip}
          </Link>
        </td>
        <td>{server.hn}</td>
        <td>
          {server.pc}/{server.pm}
        </td>
        <td>{server.gm}</td>
        <td>{server.la}</td>
      </tr>
    );
  }

  render() {
    let servers: Array<ServerCore>;

    if (this.props.query !== "") {
      let fuse = new Fuse(this.state.servers, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 25,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: ["ip", "hn", "gm", "la"]
      });
      servers = fuse.search<ServerCore>(this.props.query);
    } else {
      servers = this.state.servers;
    }

    return (
      <div className="server-table">
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Hostname</th>
              <th>Players</th>
              <th>Gamemode</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>{servers.map((server: ServerCore, index: number) => this.renderServerRow(server, index))}</tbody>
        </table>
      </div>
    );
  }
}

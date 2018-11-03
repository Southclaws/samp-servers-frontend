import * as React from "react";
import Fuse from "fuse.js";
import Link from "next/link";

import { ServerCore } from "./Server";

interface Props {
  servers: ServerCore[];
  query: string;
}

interface State {}

export default class Table extends React.Component<Props, State> {
  renderServerRow(server: ServerCore, index: number): JSX.Element {
    let passwordIcon = server.pa ? <span className="locked">🔐</span> : <span className="unlocked" />;
    return (
      <tr key={index}>
        <td className="col-hostname">
          {passwordIcon}{" "}
          <Link href={"/server/" + server.ip}>
            <span>{server.hn}</span>
          </Link>
        </td>
        <td className="col-gamemode">{server.gm}</td>
        <td className="col-players">
          {server.pc}/{server.pm}
        </td>
        <td className="col-language">{server.la}</td>
      </tr>
    );
  }

  render() {
    let servers: Array<ServerCore>;

    if (this.props.query !== "") {
      let fuse = new Fuse(this.props.servers, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 25,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: ["ip", "hn", "gm", "la"]
      });
      servers = fuse.search(this.props.query);
    } else {
      servers = this.props.servers;
    }

    return (
      <div className="list-table">
        <table>
          <thead>
            <tr>
              <th className="col-hostname">Hostname</th>
              <th className="col-gamemode">Gamemode</th>
              <th className="col-players">Players</th>
              <th className="col-language">Language</th>
            </tr>
          </thead>
          <tbody>{servers.map((server: ServerCore, index: number) => this.renderServerRow(server, index))}</tbody>
        </table>
      </div>
    );
  }
}

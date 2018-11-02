import * as React from "react";
import { Component } from "react";

import { Statistics } from "../Interfaces";

interface Props {
  data: Statistics;
}
interface State {}

export default class Stats extends Component<Props, State> {
  static async getInitialProps() {
    console.log("get stats");
    return await Stats.getStatistics();
  }

  static async getStatistics(): Promise<Statistics> {
    let response = await fetch("//api.samp-servers.net/v2/stats");
    let data = (await response.json()) as Statistics;

    return data;
  }

  render() {
    let numServers = 0;
    let numPlayers = 0;
    if (this.state != null) {
      numServers = this.props.data.servers;
      numPlayers = this.props.data.players;
    }

    return (
      <div className="section-stats">
        <p>
          <span>{numPlayers}</span> players on <span>{numServers}</span> servers with an average of{" "}
          <span>{(numPlayers / numServers).toFixed(1)}</span> players per server.
        </p>
      </div>
    );
  }
}

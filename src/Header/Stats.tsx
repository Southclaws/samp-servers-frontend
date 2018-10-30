import * as React from "react";
import { Component } from "react";

import { Statistics } from "../Interfaces";

interface Ptops {}
interface State {
  statistics: Statistics;
}

export default class Stats extends Component<Ptops, State> {
  constructor(props: Ptops) {
    super(props);
  }

  componentDidMount() {
    this.getStatistics();
  }

  async getStatistics() {
    let response: Response;
    try {
      response = await fetch("//api.samp-servers.net/v2/stats");
    } catch (error) {
      console.log("failed to GET stats:", error);
      return;
    }

    let data: Statistics;
    try {
      data = (await response.json()) as Statistics;
    } catch (error) {
      console.log("failed to parse response as JSON:", error);
      return;
    }

    this.setState({
      statistics: data
    });

    setTimeout(() => {
      this.getStatistics();
    }, 10000);
  }

  render() {
    let numServers = 0;
    let numPlayers = 0;
    if (this.state != null) {
      numServers = this.state.statistics.servers;
      numPlayers = this.state.statistics.players;
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

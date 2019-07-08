import React from "react";

import Stats from "../components/Stats";
import { getStatistics } from "../utils/utils";

class StatsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: props.stats };
  }

  async componentDidMount() {
    console.log("componentDidMount", this.props);
    setTimeout(async () => {
      this.setState({ stats: await getStatistics() });
    }, 10000);
  }

  render() {
    return <Stats players={this.state.stats.players} servers={this.state.stats.servers} />;
  }
}

export default StatsContainer;

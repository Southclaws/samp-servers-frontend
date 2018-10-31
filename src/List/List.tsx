import * as React from "react";

import { ServerCore } from "./Server";
import Controls from "./Controls";
import Table from "./Table";

interface Props {}

interface State {
  servers: ServerCore[];
  query: string;
}

export default class ServerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      servers: [],
      query: ""
    };
  }

  render() {
    if (this.state.servers === null) {
      return (
        <div>
          <p>The samp-servers.net API is currently unavailable.</p>
        </div>
      );
    }

    return (
      <div className="section-list">
        <div>
          <Controls
            onSearch={q => {
              console.log(q);
              this.setState({ query: q });
            }}
          />
          <Table query={this.state.query} />
        </div>
      </div>
    );
  }
}

import * as React from "react";

import Controls from "./Controls";
import Table from "./Table";

interface Props {}

interface State {
  query: string;
  hideEmpty: boolean;
  hideFull: boolean;
}

export default class ServerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      query: "",
      hideEmpty: true,
      hideFull: true
    };
  }

  render() {
    return (
      <div className="section-list">
        <Controls
          onSearch={(query: string, hideEmpty: boolean, hideFull: boolean) => {
            console.log({ query: query, hideEmpty: hideEmpty, hideFull: hideFull });
            this.setState({ query: query, hideEmpty: hideEmpty, hideFull: hideFull });
          }}
        />
        <Table query={this.state.query} hideEmpty={this.state.hideEmpty} hideFull={this.state.hideFull} />
      </div>
    );
  }
}

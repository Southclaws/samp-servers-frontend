import * as React from "react";
import Head from "next/head";

import { ServerCore } from "../components/List/Server";
import Controls from "../components/List/Controls";
import Table from "../components/List/Table";
import { NextContext } from "next";

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
        <p>hi</p>
        {/* <Head>
          <title>SA:MP Servers</title>
        </Head>
        <div>
          <Controls
            onSearch={q => {
              console.log(q);
              this.setState({ query: q });
            }}
          />
          <Table query={this.state.query} />
        </div> */}
      </div>
    );
  }
}

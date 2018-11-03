import * as React from "react";
import Head from "next/head";
import { NextContext } from "next";
import "isomorphic-unfetch";

import { ServerCore } from "../components/List/Server";
import { getServers } from "../components/List/Utility";
import Controls from "../components/List/Controls";
import Table from "../components/List/Table";

interface Props {
  servers: ServerCore[];
}

interface State {
  query: string;
}

export default class ServerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      query: ""
    };
  }

  static async getInitialProps(ctx: NextContext): Promise<Props> {
    console.log("server?", ctx.req !== undefined);
    let servers = await getServers();
    if (servers === undefined) {
      return Promise.reject("failed to get servers");
    }
    return {
      servers: servers
    };
  }

  render() {
    if (this.props.servers === null) {
      return (
        <div>
          <p>The samp-servers.net API is currently unavailable.</p>
        </div>
      );
    }

    return (
      <div className="section-list">
        <p>hi</p>
        <Head>
          <title>SA:MP Servers</title>
        </Head>
        <div>
          <Controls
            onSearch={q => {
              console.log(q);
              this.setState({ query: q });
            }}
          />
          <Table servers={this.props.servers} query={this.state.query} />
        </div>
      </div>
    );
  }
}

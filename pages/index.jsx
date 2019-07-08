import React from "react";

import ServerList from "../src/components/ServerList";

import { getServers } from "../src/utils/utils";

const Index = props => {
  return (
    <>
      <ServerList servers={props.servers} {...props} />
    </>
  );
};

Index.getInitialProps = async ({ query }) => {
  const servers = await getServers(query);
  return { servers, query };
};

export default Index;

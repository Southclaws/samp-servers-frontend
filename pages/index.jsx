import React from "react";

import ServerList from "../src/components/ServerList";

import { getServers } from "../src/utils/utils";

const Index = ({ servers }) => {
  return <ServerList servers={servers} />;
};

Index.getInitialProps = async () => {
  const servers = await getServers();
  return { servers };
};

export default Index;

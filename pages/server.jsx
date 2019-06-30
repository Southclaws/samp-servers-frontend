import React from "react";
import { getServer } from "../src/utils/utils";

const Page = ({ server }) => {
  return <div>{JSON.stringify(server)}</div>;
};

Page.getInitialProps = async ({ query: { ip } }) => {
  console.log("initial", ip);
  return { server: await getServer(ip) };
};

export default Page;

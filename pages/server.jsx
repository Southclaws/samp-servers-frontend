import React from "react";
import NextSeo from "next-seo";

import { getServer } from "../src/utils/utils";

const Item = ({ k, v }) => {
  return (
    <>
      <dt className="f6 pt2 b">{k}</dt>
      <dd className="ml0 lh-copy black-60">{v}</dd>
    </>
  );
};

const Description = ({ server }) => {
  if (!server.description) {
    return null;
  }
  return (
    <>
      <h4>Description</h4>
      <p>{server.description}</p>
    </>
  );
};

const Properties = ({ server }) => {
  if (!server.core) {
    return null;
  }
  return (
    <>
      <h4>Properties:</h4>
      <dl className="lh-title ph4 mt0">
        <Item k="Address" v={server.core.ip} />
        <Item k="Hostname" v={server.core.hn} />
        <Item k="Players" v={`${server.core.pc}/${server.core.pm}`} />
        <Item k="Gamemode" v={server.core.gm} />
        <Item k="Language" v={server.core.la} />
        <Item k="Mod Version" v={server.core.vn} />
      </dl>
    </>
  );
};

const Rules = ({ server }) => {
  if (!server.ru) {
    return null;
  }

  return (
    <>
      <h4>Game Rules:</h4>
      <dl className="lh-title ph4 mt0">
        {Object.keys(server.ru).map(v => (
          <Item key={v} k={v} v={server.ru[v]} />
        ))}
      </dl>
    </>
  );
};

const Page = ({ server }) => {
  return (
    <article>
      <NextSeo
        config={{
          title: `${server.core.hn} | SA:MP Servers`,
          canonical: `https://www.samp-servers.net/server/${server.core.ip}`,
          description: `View information for ${server.core.hn} (${server.core.gm}) on the SA:MP Servers Index.`
        }}
      />

      <hgroup>
        <h2 className="pv0 mb0">{server.core.hn}</h2>
        <div className="black-30 pv1 mt0 flex justify-between">
          <h3 className="di static mv0">{server.core.gm}</h3>
          <span className="lh-copy f7 self-end">
            {server.core.pa ? "🔐" : null}
            {server.core.ip}
          </span>
        </div>
      </hgroup>

      <section>
        <Description server={server} />
        <Properties server={server} />
        <Rules server={server} />
      </section>
    </article>
  );
};

Page.getInitialProps = async ({ query: { ip } }) => {
  return { server: await getServer(ip) };
};

export default Page;

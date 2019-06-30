import React from "react";
import { getServer } from "../src/utils/utils";

const Item = ({ k, v }) => {
  return (
    <>
      <dt className="f6 pt2 b">{k}</dt>
      <dd className="ml0 lh-copy black-60">{v}</dd>
    </>
  );
};

const Page = ({ server }) => {
  return (
    <article>
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
        {server.description ? (
          <>
            <h4>Description</h4>
            <p>{server.description}</p>
          </>
        ) : null}
        <h4>Properties:</h4>
        <dl className="lh-title ph4 mt0">
          <Item k="Address" v={server.core.ip} />
          <Item k="Hostname" v={server.core.hn} />
          <Item k="Players" v={`${server.core.pc}/${server.core.pm}`} />
          <Item k="Gamemode" v={server.core.gm} />
          <Item k="Language" v={server.core.la} />
          <Item k="Mod Version" v={server.core.vn} />
        </dl>
        <h4>Game Rules:</h4>
        <dl className="lh-title ph4 mt0">
          {Object.keys(server.ru).map(v => (
            <Item k={v} v={server.ru[v]} />
          ))}
        </dl>
      </section>
    </article>
  );
};

Page.getInitialProps = async ({ query: { ip } }) => {
  console.log("initial", ip);
  return { server: await getServer(ip) };
};

export default Page;

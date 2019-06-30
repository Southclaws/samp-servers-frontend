import React from "react";
import Link from "next/link";

export default ({ servers }) => {
  return (
    <ul className="list pl0 mt0 center">
      {servers.map(server => (
        <Link href={"/server/" + server.ip} as={`/server?ip=${server.ip}`}>
          <a className="link black">
            <li
              key={server.ip}
              className="flex hover-bg-light-red items-center justify-between lh-copy pa2 ph0-l bb b--black-10"
            >
              <div className="pl2">
                <span className="db black-70 measure">{server.hn}</span>
                <span className="db black-30 f6 measure">{server.gm}</span>
              </div>

              <div className="pr2 tr">
                <div className="black-70">
                  {server.pa ? <span>🔐</span> : null} <span>{server.ip}</span>
                </div>
                <div className="db black-30 f6 measure">
                  {server.pc}/{server.pm} playing now
                </div>
              </div>
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
};

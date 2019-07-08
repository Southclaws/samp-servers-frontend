import * as React from "react";
import Link from "next/link";

export default () => (
  <div className="f5 lh-title">
    <header>
      <h1 className="mv3">
        <Link href="/">
          <a className="link black hover-bg-light-red">SA:MP Servers</a>
        </Link>
      </h1>
      <h4 className="f6 black-30 lh-title mt0">
        <a href="https://southcla.ws" className="link black-30 f6 underline hover-light-red">
          by Southclaws
        </a>
      </h4>
    </header>
  </div>
);

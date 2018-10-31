import * as React from "react";
import { Component } from "react";

interface InfoProps {}
interface InfoState {}

export default class Info extends Component<InfoProps, InfoState> {
  render() {
    return (
      <div className="section-info">
        <header>
          <h2>
            <a href="/">SA:MP Servers</a>
          </h2>
          <h4>
            by <a href="https://southcla.ws">Southclaws</a>
          </h4>
        </header>
      </div>
    );
  }
}

import * as React from "react";
import { Component } from "react";

interface InfoProps {}
interface InfoState {}

export default class Info extends Component<InfoProps, InfoState> {
  render() {
    return (
      <div className="section-info">
        <header>
          <h2>SA:MP Servers</h2>
          <h3>
            by <a href="https:///southcla.ws">Southclaws</a>
          </h3>
        </header>
      </div>
    );
  }
}

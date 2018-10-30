import * as React from "react";
import { Component } from "react";

import Info from "./Header/Info";
import Stats from "./Header/Stats";
import ServerList from "./List/List";

interface Props {}
interface State {}

export default class App extends Component<Props, State> {
  render() {
    return (
      <div>
        <div>
          <div className="row">
            <div className="column">
              <Info />
            </div>
            <div className="column">
              <Stats />
            </div>
          </div>
          <div className="row">
            <ServerList />
          </div>
        </div>
      </div>
    );
  }
}

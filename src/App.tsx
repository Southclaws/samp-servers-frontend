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
      <div id="container">
        <Info />
        <Stats />
        <ServerList />
      </div>
    );
  }
}

import * as React from "react";
import { Component } from "react";
import { Route } from "react-router-dom";

import Info from "./Header/Info";
import Stats from "./Header/Stats";
import ServerList from "./List/List";
import Details from "./List/Details";

interface Props {}
interface State {}

export default class App extends Component<Props, State> {
  render() {
    return (
      <div id="container">
        <Info />
        <Stats />
        <Route exact path="/" component={ServerList} />
        <Route path="/server/:address" component={Details} />
      </div>
    );
  }
}

import * as React from "react";

// import Controls from "./Controls";
// import Table from "./Table";

// interface State {
//   query: string;
//   hideEmpty: boolean;
//   hideFull: boolean;
// }

export default class ServerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      hideEmpty: true,
      hideFull: true
    };
  }

  render() {
    return (
      <>
        {/* <Controls /> */}
        {/* <Table  /> */}
      </>
    );
  }
}

import * as React from "react";

// interface Props {
//   onSearch: (query: string, hideEmpty: boolean, hideFull: boolean) => void;
// }

// interface State {
//   query: string;
//   hideEmpty: boolean;
//   hideFull: boolean;
//   addServerTarget: string;
// }

export default class Controls extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: "",
      hideEmpty: true,
      hideFull: true,
      addServerTarget: ""
    };
  }

  notifyParent() {
    this.props.onSearch(this.state.query, this.state.hideEmpty, this.state.hideFull);
  }

  async doAddServer(address: string) {
    if (address.length < 3) {
      return;
    }

    let response: Response;
    try {
      response = await fetch("//api.samp-servers.net/v2/server/" + address, {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "text/plain"
        }
      });
    } catch (error) {
      console.error("failed to POST server:", error);
      return;
    }

    if (response.status !== 200) {
      console.error("server POST response not OK:", response.status);
      return;
    }
  }

  render() {
    return (
      <div className="list-controls">
        <form className="list-control">
          <input
            type="checkbox"
            name="hideEmpty"
            onChange={e => {
              let value = (e as React.ChangeEvent<HTMLInputElement>).target.checked;
              this.setState({
                hideEmpty: value
              });
              this.props.onSearch(this.state.query, value, this.state.hideFull);
            }}
          />
          <label htmlFor="hideEmpty">Hide Empty Servers</label>
          <input
            type="checkbox"
            name="hideFull"
            onChange={e => {
              let value = (e as React.ChangeEvent<HTMLInputElement>).target.checked;
              this.setState({
                hideFull: value
              });
              this.props.onSearch(this.state.query, this.state.hideEmpty, value);
            }}
          />
          <label htmlFor="hideFull">Hide Full Servers</label>
          <input
            type="text"
            name="search"
            placeholder="search"
            onChange={e => {
              this.setState({ query: (e as React.ChangeEvent<HTMLInputElement>).target.value });
            }}
          />
          <button
            onClick={e => {
              e.preventDefault();
              this.notifyParent();
              return false;
            }}
          >
            Search
          </button>
        </form>
        <form className="list-control">
          <input
            type="text"
            name="add"
            placeholder="Paste a server address"
            onChange={e => {
              this.setState({ addServerTarget: (e as React.ChangeEvent<HTMLInputElement>).target.value });
            }}
          />
          <button
            onClick={e => {
              e.preventDefault();
              this.doAddServer(this.state.addServerTarget);
              return false;
            }}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

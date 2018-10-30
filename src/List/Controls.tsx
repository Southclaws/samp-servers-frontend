import * as React from "react";

interface Props {
  onSearch: Function;
}

interface State {
  query: string;
  addServerTarget: string;
}

export default class Controls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: "",
      addServerTarget: ""
    };
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
      <div>
        <form>
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
              this.props.onSearch(this.state.query);
              return false;
            }}
          >
            Search
          </button>
        </form>
        <form>
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

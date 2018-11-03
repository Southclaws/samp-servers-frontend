import * as React from "react";
import Link from "next/link";

import { ServerFull } from "../components/List/Server";

interface Props {}

interface State {
  details?: ServerFull;
}

export default class Details extends React.Component<Props, State> {
  //   constructor(props: RouteComponentProps<Props>) {
  //     super(props);
  //     this.state = {
  //       details: undefined
  //     };
  //   }
  //   async componentDidMount() {
  //     let details = await this.getServerDetails((this.props.match.params as { address: string }).address);
  //     this.setState({ details: details });
  //   }
  //   async getServerDetails(address: string): Promise<ServerFull | undefined> {
  //     let response: Response;
  //     try {
  //       response = await fetch("//api.samp-servers.net/v2/server/" + address);
  //     } catch (error) {
  //       console.error("failed to GET server:", error);
  //       return;
  //     }
  //     if (response.status !== 200) {
  //       console.error("failed to GET server:", response.status);
  //       return;
  //     }
  //     let data: ServerFull;
  //     try {
  //       data = await response.json();
  //     } catch (error) {
  //       console.error("failed to parse response as JSON:", error);
  //       return;
  //     }
  //     return data;
  //   }
  serverRules(): JSX.Element[] {
    //     let details = this.state.details;
    //     if (details === undefined) {
    //       return [<div key={0} />];
    //     }
    let result: JSX.Element[] = [];
    //     Object.keys(details.ru).map((value: string, index: number, array: string[]) => {
    //       result.push(
    //         <tr key={index}>
    //           <td>{value}</td>
    //           <td>{details!.ru[value]}</td>
    //         </tr>
    //       );
    //       return;
    //     });
    return result;
  }
  render() {
    return (
      <div className="section-details">
        <Link href="/">
          <span>Back</span>
        </Link>
        {this.state.details === undefined ? (
          <div>{/* <p>{"Loading " + (this.props.params as { address: string }).address}</p> */}</div>
        ) : (
          <div>
            <h1>{this.state.details.core.hn}</h1>
            <table className="details-core">
              <tr>
                <td>IP</td>
                <td>{this.state.details.core.ip}</td>
              </tr>
              <tr>
                <td>Hostname</td>
                <td>{this.state.details.core.hn}</td>
              </tr>
              <tr>
                <td>Players</td>
                <td>
                  {this.state.details.core.pc}/{this.state.details.core.pm}
                </td>
              </tr>
              <tr>
                <td>Gamemode</td>
                <td>{this.state.details.core.gm}</td>
              </tr>
              <tr>
                <td>Language</td>
                <td>{this.state.details.core.la}</td>
              </tr>
              <tr>
                <td>Password</td>
                <td>{this.state.details.core.pa}</td>
              </tr>
              <tr>
                <td>Version</td>
                <td>{this.state.details.core.vn}</td>
              </tr>
            </table>
            <table className="details-rules">{this.serverRules()}</table>
            <div className="details-extra">
              <p>
                {this.state.details.description === "" ? "(No description provided)" : this.state.details.description}
              </p>
              {this.state.details.banner === "" ? (
                "(No banner image provided)"
              ) : (
                <img src={this.state.details.banner} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

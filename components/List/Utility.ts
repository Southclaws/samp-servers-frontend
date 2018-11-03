import "isomorphic-unfetch";
import { ServerCore } from "./Server";

export async function getServers() {
  let response = await fetch("//api.samp-servers.net/v2/servers");
  return (await response.json()) as ServerCore[];
}

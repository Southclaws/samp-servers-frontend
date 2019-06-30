import React from "react";

export default ({ players = 0, servers = 0 }) => {
  return (
    <div>
      <p>
        <span>{players}</span> players on <span>{servers}</span> servers with an average of{" "}
        <span>{(players / servers).toFixed(1)}</span> players per server.
      </p>
    </div>
  );
};

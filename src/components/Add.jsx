import React from "react";

const formItemStyle = "pa1 ph2 flex flex-column flex-row-ns tl-ns tc";

export default () => {
  return (
    <form
      action="//api.samp-servers.net/v2/server"
      target="_self"
      method="post"
      className="flex flex-wrap items-center justify-center pa2 f7"
    >
      <span className={formItemStyle}>
        <label className="pr2 self-center" htmlFor="address">
          Add Server:
        </label>
        <input className="pr2" type="text" name="address" placeholder="IP or Domain" />
        <input
          className={[
            "ph3",
            "f6",
            "pointer",
            "no-underline",
            "black",
            "bg-white",
            "hover-bg-light-red",
            "hover-white",
            "inline-flex",
            "items-center",
            "pa2",
            "ba",
            "border-box",
            "mr4"
          ].join(" ")}
          type="submit"
          value="Add"
        />
      </span>
    </form>
  );
};

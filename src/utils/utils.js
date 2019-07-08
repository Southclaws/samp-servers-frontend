import axios from "axios";

export const ipToSlug = ip => {
  return ip.replace(/\./g, "-");
};

export const slugToIP = slug => {
  return slug.replace(/-/g, ".");
};

export const getStatistics = async () => {
  const response = await axios.get("https://api.samp-servers.net/v2/stats");
  return await response.data;
};

export const getServers = async ({ by, showFull, showEmpty, page, pagesize, reverse }) => {
  console.log("getter", by, showFull, showEmpty, page, pagesize, reverse);
  const params = new URLSearchParams();

  if (by) {
    params.append("by", by);
  }
  if (reverse) {
    console.log("sort", "asc");
    params.append("sort", "asc");
  } else {
    console.log("sort", "desc");
    params.append("sort", "desc");
  }
  if (!showEmpty) {
    params.append("filters", "empty");
  }
  if (!showFull) {
    params.append("filters", "full");
  }

  const options = {
    params
  };

  console.log("opts:", options);

  const response = await axios.get("https://api.samp-servers.net/v2/servers/", options);
  return await response.data;
};

export const getServer = async address => {
  const response = await axios.get(`https://api.samp-servers.net/v2/server/${address}`);
  return await response.data;
};

import fetch from "isomorphic-unfetch";

export const ipToSlug = ip => {
  return ip.replace(/\./g, "-");
};

export const slugToIP = slug => {
  return slug.replace(/-/g, ".");
};

export const getStatistics = async () => {
  const response = await fetch("https://api.samp-servers.net/v2/stats");
  return await response.json();
};

export const getServers = async () => {
  const response = await fetch("https://api.samp-servers.net/v2/servers");
  return await response.json();
};

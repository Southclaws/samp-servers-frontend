export interface Statistics {
  servers: number;
  players: number;
  playersPerServer: number;
}

export function ipToSlug(ip: string): string {
  return ip.replace(/\./g, "-");
}

export function slugToIP(slug: string): string {
  return slug.replace(/-/g, ".");
}

export interface RegionalData {
  US: number;
  EU: number;
  LATAM: number;
  APAC: number;
}

export interface Metric {
  timestamp: string;
  activeUsers: number;
  newUsers: number;
  revenue: number;
  churnRate: number;
  byRegion: RegionalData;
}

export interface MetricsResponse extends Array<Metric> {}

export interface KPIs {
  activeUsers: number;
  newUsers: number;
  revenue: number;
  churnRate: number;
}

export interface RegionalBreakdown {
  region: string;
  users: number;
}

import type { Metric, KPIs, RegionalBreakdown } from '@/types/metrics';
import { CHURN_THRESHOLD } from '@/constants/config';

export function getLatestMetric(metrics: Metric[]): Metric | null {
  if (!metrics || metrics.length === 0) return null;
  return metrics[metrics.length - 1];
}

export function extractKPIs(metric: Metric | null): KPIs | null {
  if (!metric) return null;

  return {
    activeUsers: metric.activeUsers,
    newUsers: metric.newUsers,
    revenue: metric.revenue,
    churnRate: metric.churnRate,
  };
}

export function isChurnAlert(churnRate: number): boolean {
  return churnRate > CHURN_THRESHOLD;
}

export function extractRegionalData(metric: Metric | null): RegionalBreakdown[] {
  if (!metric) return [];

  return Object.entries(metric.byRegion).map(([region, users]) => ({
    region,
    users,
  }));
}

export function calculateTotalRegionalUsers(data: RegionalBreakdown[]): number {
  return data.reduce((sum, { users }) => sum + users, 0);
}

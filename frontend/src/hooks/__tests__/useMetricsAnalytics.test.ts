import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMetricsAnalytics } from '../useMetricsAnalytics';
import type { Metric } from '@/types/metrics';

const mockMetrics: Metric[] = [
  {
    timestamp: '2024-01-01T12:00:00Z',
    activeUsers: 2500,
    newUsers: 120,
    revenue: 5000,
    churnRate: 0.03,
    byRegion: { US: 1000, EU: 800, LATAM: 400, APAC: 300 },
  },
  {
    timestamp: '2024-01-01T12:05:00Z',
    activeUsers: 2600,
    newUsers: 130,
    revenue: 5200,
    churnRate: 0.06,
    byRegion: { US: 1100, EU: 850, LATAM: 400, APAC: 250 },
  },
];

describe('useMetricsAnalytics', () => {
  it('should return latest metric and KPIs', () => {
    const { result } = renderHook(() => useMetricsAnalytics(mockMetrics));

    expect(result.current.kpis?.activeUsers).toBe(2600);
    expect(result.current.kpis?.churnRate).toBe(0.06);
    expect(result.current.kpis?.newUsers).toBe(130);
    expect(result.current.kpis?.revenue).toBe(5200);
  });

  it('should detect churn alert when churn > 5%', () => {
    const { result } = renderHook(() => useMetricsAnalytics(mockMetrics));
    expect(result.current.hasChurnAlert).toBe(true);
  });

  it('should not detect churn alert when churn <= 5%', () => {
    const lowChurnMetrics: Metric[] = [
      {
        ...mockMetrics[0],
        churnRate: 0.04,
      },
    ];
    const { result } = renderHook(() => useMetricsAnalytics(lowChurnMetrics));
    expect(result.current.hasChurnAlert).toBe(false);
  });

  it('should handle empty metrics', () => {
    const { result } = renderHook(() => useMetricsAnalytics([]));
    expect(result.current.kpis).toBeNull();
    expect(result.current.hasChurnAlert).toBe(false);
    expect(result.current.regionalData).toEqual([]);
    expect(result.current.timeSeries).toEqual([]);
  });

  it('should extract regional data correctly', () => {
    const { result } = renderHook(() => useMetricsAnalytics(mockMetrics));
    expect(result.current.regionalData).toEqual([
      { region: 'US', users: 1100 },
      { region: 'EU', users: 850 },
      { region: 'LATAM', users: 400 },
      { region: 'APAC', users: 250 },
    ]);
  });

  it('should return timeSeries as provided metrics', () => {
    const { result } = renderHook(() => useMetricsAnalytics(mockMetrics));
    expect(result.current.timeSeries).toEqual(mockMetrics);
  });
});

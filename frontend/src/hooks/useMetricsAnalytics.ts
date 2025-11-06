import { useMemo } from 'react';
import type { Metric } from '@/types/metrics';
import {
  getLatestMetric,
  extractKPIs,
  extractRegionalData,
  isChurnAlert,
} from '@/utils/metricsCalculations';

export function useMetricsAnalytics(metrics: Metric[] | undefined) {
  return useMemo(() => {
    if (!metrics || metrics.length === 0) {
      return {
        latest: null,
        kpis: null,
        regionalData: [],
        timeSeries: [],
        hasChurnAlert: false,
      };
    }

    const latest = getLatestMetric(metrics);
    const kpis = extractKPIs(latest);
    const regionalData = extractRegionalData(latest);
    const hasChurnAlert = kpis ? isChurnAlert(kpis.churnRate) : false;

    return {
      latest,
      kpis,
      regionalData,
      timeSeries: metrics,
      hasChurnAlert,
    };
  }, [metrics]);
}

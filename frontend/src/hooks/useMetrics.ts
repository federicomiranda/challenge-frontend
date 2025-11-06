import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '@/api/metricsApi';
import { POLL_INTERVAL, METRICS_COUNT } from '@/constants/config';

export function useMetrics() {
  return useQuery({
    queryKey: ['metrics', METRICS_COUNT],
    queryFn: () => fetchMetrics(METRICS_COUNT),
    refetchInterval: POLL_INTERVAL,
    refetchIntervalInBackground: true,
  });
}

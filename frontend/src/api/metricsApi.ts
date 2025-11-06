import { API_URL, METRICS_COUNT } from '@/constants/config';
import type { MetricsResponse } from '@/types/metrics';

export async function fetchMetrics(count: number = METRICS_COUNT): Promise<MetricsResponse> {
  const response = await fetch(`${API_URL}/metrics?count=${count}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch metrics: ${response.statusText}`);
  }

  const data: MetricsResponse = await response.json();
  return data;
}

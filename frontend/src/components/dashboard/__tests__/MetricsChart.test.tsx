import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MetricsChart } from '../MetricsChart';
import type { Metric } from '@/types/metrics';

const mockData: Metric[] = [
  {
    timestamp: '2024-01-01T12:00:00Z',
    activeUsers: 2500,
    newUsers: 120,
    revenue: 5000,
    churnRate: 0.03,
    byRegion: { US: 1000, EU: 800, LATAM: 400, APAC: 300 },
  },
];

describe('MetricsChart', () => {
  it('should render chart title', () => {
    const { container } = render(<MetricsChart data={mockData} />);
    expect(container.textContent).toContain('Evolución de Métricas en Tiempo Real');
  });

  it('should render ResponsiveContainer', () => {
    const { container } = render(<MetricsChart data={mockData} />);
    // Recharts renders a div with specific class
    const chartDiv = container.querySelector('div.recharts-responsive-container');
    expect(chartDiv).toBeTruthy();
  });
});

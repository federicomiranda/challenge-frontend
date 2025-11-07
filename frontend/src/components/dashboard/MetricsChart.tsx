import { Card } from '@/components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatTimestamp, formatCurrency, formatPercentage } from '@/utils/formatters';
import type { Metric } from '@/types/metrics';

interface MetricsChartProps {
  data: Metric[];
}

export function MetricsChart({ data }: MetricsChartProps) {
  return (
    <Card className="col-span-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Evolución de Métricas en Tiempo Real
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTimestamp}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
            labelFormatter={(label) => `Tiempo: ${formatTimestamp(label as string)}`}
            formatter={(value: number, name: string) => {
              if (name === 'revenue') return formatCurrency(value);
              if (name === 'churnRate') return formatPercentage(value);
              return value.toLocaleString();
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Active Users"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="churnRate"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Churn Rate"
          />
          <Line
            type="monotone"
            dataKey="newUsers"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            name="New Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

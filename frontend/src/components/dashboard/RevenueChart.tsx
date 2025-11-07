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
import { formatTimestamp, formatCurrency } from '@/utils/formatters';
import type { Metric } from '@/types/metrics';

interface RevenueChartProps {
  data: Metric[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Ingresos en Tiempo Real
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTimestamp}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
            labelFormatter={(label) => `Tiempo: ${formatTimestamp(label as string)}`}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

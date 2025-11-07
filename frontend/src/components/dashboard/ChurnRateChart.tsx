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
  ReferenceLine,
} from 'recharts';
import { formatTimestamp, formatPercentage } from '@/utils/formatters';
import { CHURN_THRESHOLD } from '@/constants/config';
import type { Metric } from '@/types/metrics';

interface ChurnRateChartProps {
  data: Metric[];
}

export function ChurnRateChart({ data }: ChurnRateChartProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tasa de Abandono (Churn Rate)
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
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            domain={[0, 0.15]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
            labelFormatter={(label) => `Tiempo: ${formatTimestamp(label as string)}`}
            formatter={(value: number) => formatPercentage(value)}
          />
          <Legend />
          <ReferenceLine
            y={CHURN_THRESHOLD}
            stroke="#ef4444"
            strokeDasharray="3 3"
            label={{ value: 'Umbral de Alerta (5%)', position: 'right', fill: '#ef4444' }}
          />
          <Line
            type="monotone"
            dataKey="churnRate"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
            name="Churn Rate"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

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
import { formatTimestamp } from '@/utils/formatters';
import type { Metric } from '@/types/metrics';

interface UsersChartProps {
  data: Metric[];
}

export function UsersChart({ data }: UsersChartProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Usuarios Activos y Nuevos
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
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
            }}
            labelFormatter={(label) => `Tiempo: ${formatTimestamp(label as string)}`}
            formatter={(value: number) => value.toLocaleString()}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            name="Active Users"
          />
          <Line
            type="monotone"
            dataKey="newUsers"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            name="New Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

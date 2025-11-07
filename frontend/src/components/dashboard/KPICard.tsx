import { Card, Badge } from '@/components';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/formatters';

interface KPICardProps {
  title: string;
  value: number;
  type: 'currency' | 'number' | 'percentage';
  alert?: boolean;
}

export function KPICard({ title, value, type, alert = false }: KPICardProps) {
  const formatValue = () => {
    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
        return formatNumber(value);
    }
  };

  return (
    <Card alert={alert}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {alert && <Badge variant="error">⚠️ Alert</Badge>}
        </div>
        <p
          className={`text-3xl font-bold ${alert ? 'text-red-600' : 'text-gray-900'}`}
        >
          {formatValue()}
        </p>
      </div>
    </Card>
  );
}

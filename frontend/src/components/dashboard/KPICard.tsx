import { memo } from 'react';
import { Card, Badge } from '@/components';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/formatters';

interface KPICardProps {
  title: string;
  value: number;
  type: 'currency' | 'number' | 'percentage';
  alert?: boolean;
}

export const KPICard = memo(function KPICard({ title, value, type, alert = false }: KPICardProps) {
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
      <div className="flex flex-col" role="region" aria-label={`${title} metric`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600" id={`kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h3>
          {alert && <Badge variant="error">⚠️ Alert</Badge>}
        </div>
        <p
          className={`text-3xl font-bold ${alert ? 'text-red-600' : 'text-gray-900'}`}
          aria-labelledby={`kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {formatValue()}
        </p>
      </div>
    </Card>
  );
});

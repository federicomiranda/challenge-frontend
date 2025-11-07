import { memo } from 'react';
import { Card } from '@/components';
import { formatNumber } from '@/utils/formatters';
import type { RegionalBreakdown as RegionalData } from '@/types/metrics';

interface RegionalBreakdownProps {
  data: RegionalData[];
}

export const RegionalBreakdown = memo(function RegionalBreakdown({ data }: RegionalBreakdownProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Usuarios por Región
      </h3>
      <div className="space-y-3">
        {data.map(({ region, users }) => (
          <div key={region} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">{region}</span>
            <span className="text-lg font-bold text-gray-900">
              {formatNumber(users)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
});

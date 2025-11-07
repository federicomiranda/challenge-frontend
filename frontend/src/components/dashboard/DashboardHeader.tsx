import { LastUpdatedIndicator } from './LastUpdatedIndicator';

interface DashboardHeaderProps {
  lastUpdated: Date | null;
}

export function DashboardHeader({ lastUpdated }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Dashboard de Analytics en Tiempo Real
      </h1>
      <LastUpdatedIndicator date={lastUpdated} />
    </div>
  );
}

import { useMetrics } from '@/hooks/useMetrics';
import { useMetricsAnalytics } from '@/hooks/useMetricsAnalytics';
import {
  LoadingSpinner,
  OfflineBanner,
  DashboardHeader,
  KPICard,
  UsersChart,
  RevenueChart,
  ChurnRateChart,
  RegionalBreakdown,
  Alert,
} from '@/components';

export function DashboardLayout() {
  const { data: metrics, isLoading, isError, dataUpdatedAt } = useMetrics();
  const { kpis, regionalData, timeSeries, hasChurnAlert } = useMetricsAnalytics(metrics);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader lastUpdated={lastUpdated} />

        {isError && (
          <div className="mb-6">
            <OfflineBanner />
          </div>
        )}

        {hasChurnAlert && (
          <div className="mb-6">
            <Alert variant="error">
              ⚠️ Alerta: Tasa de abandono alta detectada ({kpis && (kpis.churnRate * 100).toFixed(2)}%)
            </Alert>
          </div>
        )}

        {kpis && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <KPICard
              title="Usuarios Activos"
              value={kpis.activeUsers}
              type="number"
            />
            <KPICard
              title="Nuevos Usuarios"
              value={kpis.newUsers}
              type="number"
            />
            <KPICard
              title="Ingresos"
              value={kpis.revenue}
              type="currency"
            />
            <KPICard
              title="Tasa de Abandono"
              value={kpis.churnRate}
              type="percentage"
              alert={hasChurnAlert}
            />
          </div>
        )}

        {timeSeries.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <UsersChart data={timeSeries} />
              <RevenueChart data={timeSeries} />
            </div>
            <div className="mb-6">
              <ChurnRateChart data={timeSeries} />
            </div>
          </>
        )}

        {regionalData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RegionalBreakdown data={regionalData} />
          </div>
        )}
      </div>
    </div>
  );
}

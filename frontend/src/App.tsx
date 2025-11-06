import { useEffect, useState, useRef } from "react";

interface Metric {
  timestamp: string;
  activeUsers: number;
  newUsers: number;
  revenue: number;
  churnRate: number;
  byRegion: {
    US: number;
    EU: number;
    LATAM: number;
    APAC: number;
  };
}

function App() {
  const [metrics, setMetrics] = useState<Metric[] | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch("http://localhost:4000/metrics");
      const data = await res.json();
      if (!hasFetched.current) {
        console.log("Datos recibidos:", data);
        hasFetched.current = true;
      }
      setMetrics(data);
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics || metrics.length === 0) return <div className="p-4">Cargando métricas...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📊 Dashboard de Métricas</h1>
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Registro #{index + 1}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 shadow rounded">
                <h2 className="font-semibold">Usuarios Activos</h2>
                <p className="text-xl">{metric.activeUsers}</p>
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h2 className="font-semibold">Ingresos</h2>
                <p className="text-xl">${metric.revenue}</p>
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h2 className="font-semibold">Churn</h2>
                <p className={metric.churnRate > 0.05 ? "text-red-500 text-xl" : "text-green-600 text-xl"}>
                  {(metric.churnRate * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { Alert } from '@/components';

export function OfflineBanner() {
  return (
    <Alert variant="warning">
      ⚠️ No se puede conectar con el servidor. Mostrando últimos datos conocidos.
    </Alert>
  );
}

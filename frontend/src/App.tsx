import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout />
    </QueryClientProvider>
  );
}

export default App;

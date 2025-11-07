import { Component, type ReactNode } from 'react';
import { Alert } from './Alert';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert variant="error">
              <div className="space-y-2">
                <p className="font-bold">Ocurrió un error inesperado</p>
                <p className="text-sm">
                  Por favor recarga la página. Si el problema persiste, contacta al soporte.
                </p>
                {this.state.error && (
                  <details className="text-xs mt-2">
                    <summary className="cursor-pointer">Detalles técnicos</summary>
                    <pre className="mt-2 overflow-auto">{this.state.error.message}</pre>
                  </details>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Recargar página
                </button>
              </div>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

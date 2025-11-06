/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_POLL_INTERVAL: string;
  readonly VITE_CHURN_THRESHOLD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

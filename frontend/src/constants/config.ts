export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export const POLL_INTERVAL = Number(import.meta.env.VITE_POLL_INTERVAL) || 5000;
export const CHURN_THRESHOLD = Number(import.meta.env.VITE_CHURN_THRESHOLD) || 0.05;
export const METRICS_COUNT = 20;

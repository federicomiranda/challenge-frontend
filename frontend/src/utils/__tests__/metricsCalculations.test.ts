import { describe, it, expect } from 'vitest';
import {
  getLatestMetric,
  extractKPIs,
  isChurnAlert,
  extractRegionalData,
  calculateTotalRegionalUsers,
} from '../metricsCalculations';
import type { Metric } from '@/types/metrics';

const mockMetric: Metric = {
  timestamp: '2024-01-01T12:00:00Z',
  activeUsers: 2500,
  newUsers: 120,
  revenue: 5000,
  churnRate: 0.03,
  byRegion: { US: 1000, EU: 800, LATAM: 400, APAC: 300 },
};

describe('metricsCalculations', () => {
  describe('getLatestMetric', () => {
    it('should return last metric', () => {
      const metrics = [mockMetric, { ...mockMetric, activeUsers: 3000 }];
      const latest = getLatestMetric(metrics);
      expect(latest?.activeUsers).toBe(3000);
    });

    it('should return null for empty array', () => {
      expect(getLatestMetric([])).toBeNull();
    });

    it('should return single metric', () => {
      const latest = getLatestMetric([mockMetric]);
      expect(latest).toEqual(mockMetric);
    });
  });

  describe('extractKPIs', () => {
    it('should extract KPIs from metric', () => {
      const kpis = extractKPIs(mockMetric);
      expect(kpis).toEqual({
        activeUsers: 2500,
        newUsers: 120,
        revenue: 5000,
        churnRate: 0.03,
      });
    });

    it('should return null for null metric', () => {
      expect(extractKPIs(null)).toBeNull();
    });
  });

  describe('isChurnAlert', () => {
    it('should return true when churn > 5%', () => {
      expect(isChurnAlert(0.06)).toBe(true);
      expect(isChurnAlert(0.1)).toBe(true);
    });

    it('should return false when churn <= 5%', () => {
      expect(isChurnAlert(0.05)).toBe(false);
      expect(isChurnAlert(0.03)).toBe(false);
      expect(isChurnAlert(0)).toBe(false);
    });
  });

  describe('extractRegionalData', () => {
    it('should convert regional object to array', () => {
      const regionalData = extractRegionalData(mockMetric);
      expect(regionalData).toEqual([
        { region: 'US', users: 1000 },
        { region: 'EU', users: 800 },
        { region: 'LATAM', users: 400 },
        { region: 'APAC', users: 300 },
      ]);
    });

    it('should return empty array for null metric', () => {
      expect(extractRegionalData(null)).toEqual([]);
    });
  });

  describe('calculateTotalRegionalUsers', () => {
    it('should sum all regional users', () => {
      const data = [
        { region: 'US', users: 1000 },
        { region: 'EU', users: 800 },
        { region: 'LATAM', users: 400 },
        { region: 'APAC', users: 300 },
      ];
      expect(calculateTotalRegionalUsers(data)).toBe(2500);
    });

    it('should return 0 for empty array', () => {
      expect(calculateTotalRegionalUsers([])).toBe(0);
    });
  });
});

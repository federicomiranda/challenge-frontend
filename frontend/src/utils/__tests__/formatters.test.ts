import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercentage, formatNumber } from '../formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format currency with 2 decimals', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should handle negative numbers', () => {
      expect(formatCurrency(-500.25)).toBe('-$500.25');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage from decimal', () => {
      expect(formatPercentage(0.05)).toBe('5.00%');
      expect(formatPercentage(0.125)).toBe('12.50%');
    });

    it('should handle zero', () => {
      expect(formatPercentage(0)).toBe('0.00%');
    });

    it('should handle values > 1', () => {
      expect(formatPercentage(1.5)).toBe('150.00%');
    });
  });

  describe('formatNumber', () => {
    it('should format number with thousands separator', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(100)).toBe('100');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('should handle decimals by rounding', () => {
      expect(formatNumber(1234.56)).toBe('1,234.56');
    });
  });
});

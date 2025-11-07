import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KPICard } from '../KPICard';

describe('KPICard', () => {
  it('should render title and formatted value', () => {
    render(<KPICard title="Revenue" value={5000} type="currency" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
  });

  it('should show alert badge when alert is true', () => {
    render(<KPICard title="Churn Rate" value={0.08} type="percentage" alert />);
    expect(screen.getByText('⚠️ Alert')).toBeInTheDocument();
  });

  it('should format currency correctly', () => {
    render(<KPICard title="Revenue" value={1234.56} type="currency" />);
    expect(screen.getByText('$1,234.56')).toBeInTheDocument();
  });

  it('should format percentage correctly', () => {
    render(<KPICard title="Churn" value={0.05} type="percentage" />);
    expect(screen.getByText('5.00%')).toBeInTheDocument();
  });

  it('should format number correctly', () => {
    render(<KPICard title="Users" value={1234567} type="number" />);
    expect(screen.getByText('1,234,567')).toBeInTheDocument();
  });
});

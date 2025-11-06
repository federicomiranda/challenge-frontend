import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('should render children', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply alert styles when alert prop is true', () => {
    const { container } = render(<Card alert>Alert Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('border-red-500');
    expect(card.className).toContain('border-2');
  });

  it('should apply default styles when alert prop is false', () => {
    const { container } = render(<Card>Normal Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('border-gray-200');
    expect(card.className).toContain('border');
  });

  it('should accept additional className', () => {
    const { container } = render(<Card className="custom-class">Custom Card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-class');
    expect(card.className).toContain('bg-white');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, TextButton } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies variant class', () => {
    render(<Button onClick={() => {}} variant="danger">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button.className).toContain('btn-danger');
  });

  it('disables when disabled prop is true', () => {
    render(<Button onClick={() => {}} disabled>Disabled</Button>);
    const button = screen.getByText('Disabled') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});

describe('TextButton', () => {
  it('renders with custom color', () => {
    render(<TextButton onClick={() => {}} color="#ff0000">Red</TextButton>);
    const button = screen.getByText('Red');
    expect(button.style.color).toBe('rgb(255, 0, 0)');
  });
});

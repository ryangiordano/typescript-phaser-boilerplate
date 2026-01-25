import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Panel, Section, EmptyText, Hint } from './Panel';

describe('Panel', () => {
  it('renders title and children', () => {
    render(
      <Panel title="Test Panel">
        <p>Content</p>
      </Panel>
    );
    expect(screen.getByText('Test Panel')).toBeDefined();
    expect(screen.getByText('Content')).toBeDefined();
  });

  it('applies custom width', () => {
    const { container } = render(<Panel title="Test" width={500}>Content</Panel>);
    const panel = container.querySelector('.panel') as HTMLElement;
    expect(panel.style.width).toBe('500px');
  });
});

describe('Section', () => {
  it('renders title and children', () => {
    render(
      <Section title="Section Title">
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section Title')).toBeDefined();
    expect(screen.getByText('Section content')).toBeDefined();
  });

  it('renders rightContent when provided', () => {
    render(
      <Section title="Section" rightContent={<span>Right</span>}>
        Content
      </Section>
    );
    expect(screen.getByText('Right')).toBeDefined();
  });
});

describe('EmptyText', () => {
  it('renders with empty-text class', () => {
    const { container } = render(<EmptyText>No items</EmptyText>);
    expect(container.querySelector('.empty-text')).toBeDefined();
    expect(screen.getByText('No items')).toBeDefined();
  });
});

describe('Hint', () => {
  it('renders with hint-text class', () => {
    const { container } = render(<Hint>Press ESC to close</Hint>);
    expect(container.querySelector('.hint-text')).toBeDefined();
    expect(screen.getByText('Press ESC to close')).toBeDefined();
  });
});

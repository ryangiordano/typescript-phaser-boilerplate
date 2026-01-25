import { describe, it, expect, vi } from 'vitest';
import { SelectionManager } from './SelectionManager';
import { Selectable } from '../../core/types';

function createMockSelectable(): Selectable {
  return {
    select: vi.fn(),
    deselect: vi.fn(),
    isSelected: vi.fn(() => false),
  };
}

describe('SelectionManager', () => {
  it('selects a single unit', () => {
    const manager = new SelectionManager();
    const unit = createMockSelectable();

    manager.select(unit);

    expect(unit.select).toHaveBeenCalled();
    expect(manager.getSelected()).toContain(unit);
    expect(manager.getSelectionCount()).toBe(1);
  });

  it('clears previous selection when selecting new unit', () => {
    const manager = new SelectionManager();
    const unit1 = createMockSelectable();
    const unit2 = createMockSelectable();

    manager.select(unit1);
    manager.select(unit2);

    expect(unit1.deselect).toHaveBeenCalled();
    expect(manager.getSelected()).not.toContain(unit1);
    expect(manager.getSelected()).toContain(unit2);
    expect(manager.getSelectionCount()).toBe(1);
  });

  it('adds to selection without clearing', () => {
    const manager = new SelectionManager();
    const unit1 = createMockSelectable();
    const unit2 = createMockSelectable();

    manager.addToSelection(unit1);
    manager.addToSelection(unit2);

    expect(manager.getSelected()).toContain(unit1);
    expect(manager.getSelected()).toContain(unit2);
    expect(manager.getSelectionCount()).toBe(2);
  });

  it('toggles selection', () => {
    const manager = new SelectionManager();
    const unit = createMockSelectable();

    manager.toggleSelection(unit);
    expect(manager.hasSelection()).toBe(true);

    manager.toggleSelection(unit);
    expect(manager.hasSelection()).toBe(false);
  });

  it('clears all selections', () => {
    const manager = new SelectionManager();
    const unit1 = createMockSelectable();
    const unit2 = createMockSelectable();

    manager.addToSelection(unit1);
    manager.addToSelection(unit2);
    manager.clearSelection();

    expect(unit1.deselect).toHaveBeenCalled();
    expect(unit2.deselect).toHaveBeenCalled();
    expect(manager.hasSelection()).toBe(false);
  });

  it('selects multiple units at once', () => {
    const manager = new SelectionManager();
    const units = [createMockSelectable(), createMockSelectable(), createMockSelectable()];

    manager.selectMultiple(units);

    expect(manager.getSelectionCount()).toBe(3);
    units.forEach(unit => {
      expect(unit.select).toHaveBeenCalled();
    });
  });
});

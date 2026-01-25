import { create } from 'zustand';

/** Active menu types - extend as needed */
export type ActiveMenu = 'none' | 'pause' | 'inventory' | 'settings';

interface GameStore {
  // Game state (Phaser writes, React reads)
  isPaused: boolean;

  // UI state
  activeMenu: ActiveMenu;

  // Actions - UI control
  openMenu: (menu: ActiveMenu) => void;
  closeMenu: () => void;
  pause: () => void;
  resume: () => void;

  // Command callbacks pattern (Phaser registers handlers for these)
  // Example: _onPlayerAction: ((action: string) => void) | null;

  // Register command handlers (called by Phaser on init)
  // registerCommandHandlers: (handlers: { ... }) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  isPaused: false,
  activeMenu: 'none',

  // UI actions
  openMenu: (menu) => set({
    activeMenu: menu,
    isPaused: true
  }),

  closeMenu: () => set({
    activeMenu: 'none',
    isPaused: false
  }),

  pause: () => set({ isPaused: true }),
  resume: () => set({ isPaused: false }),
}));

/** Direct access for Phaser (outside React components) */
export const gameStore = useGameStore;

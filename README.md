# Phaser Starter Template

A TypeScript Phaser 3 game starter template with React UI, XState state machines, and reusable components.

## Tech Stack

- **Phaser 3** - 2D game engine
- **React** - UI overlay layer
- **Zustand** - State bridge between Phaser and React
- **XState** - State machines for entity behavior
- **Vite** - Build tool
- **Vitest** - Testing

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── core/               # Config, types, utilities
├── components/         # Reusable Phaser components
│   ├── StatBar/        # HP/MP/XP bars
│   ├── EdgeScrollCamera/
│   ├── SelectionManager/
│   └── GameEventManager/
├── systems/            # Game systems
│   └── TickSystem/     # DOTs, buffs, periodic effects
├── commands/           # Command pattern
├── vfx/                # Visual effects
│   └── primitives/
│       └── FloatingText/
├── ui/                 # React UI layer
│   ├── components/     # Button, Panel
│   └── store/          # Zustand store
└── features/           # Game features
    └── example/        # Demo scene
```

## Key Patterns

### React-Phaser Bridge

```tsx
// Phaser writes to store
gameStore.getState().setPlayerHealth(50);

// React reads from store
const health = useGameStore((s) => s.playerHealth);
```

### XState for Entity Behavior

```typescript
export const enemyMachine = setup({
  /* ... */
}).createMachine({
  initial: 'idle',
  states: {
    idle: { on: { PLAYER_SPOTTED: 'chasing' } },
    chasing: { /* ... */ },
  },
});
```

### Game Events (Decoupled)

```typescript
// Emit events from game logic
scene.events.emit(GameEvents.DAMAGE, { x, y, amount: 10 });

// Handle events separately (in scene setup)
new GameEventManager(scene, {
  onDamage: ({ x, y, amount }) => floatingText.showDamage(x, y, amount),
});
```

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI

## License

MIT

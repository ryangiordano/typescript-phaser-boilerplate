import { setup, assign } from 'xstate';

/**
 * Example state machine context.
 * Replace with your game object's state.
 */
export interface ExampleContext {
  /** Target position for movement */
  destination: { x: number; y: number } | null;
  /** Current target (for combat, interaction, etc.) */
  target: { id: string } | null;
}

/**
 * Events that can be sent to the state machine.
 * Define all possible triggers here.
 */
export type ExampleEvent =
  | { type: 'MOVE_TO'; x: number; y: number }
  | { type: 'INTERACT'; targetId: string }
  | { type: 'ARRIVED' }
  | { type: 'CANCEL' };

/**
 * Example state machine for a game entity.
 *
 * States:
 * - idle: Waiting for commands
 * - moving: Moving to a destination
 * - interacting: Engaged with a target
 *
 * This demonstrates the XState v5 pattern used in this template.
 * Copy and adapt for your game objects (Player, Enemy, NPC, etc.)
 */
export const exampleMachine = setup({
  types: {
    context: {} as ExampleContext,
    events: {} as ExampleEvent,
  },
  actions: {
    setDestination: assign(({ event }) => {
      if (event.type === 'MOVE_TO') {
        return { destination: { x: event.x, y: event.y } };
      }
      return {};
    }),
    setTarget: assign(({ event }) => {
      if (event.type === 'INTERACT') {
        return { target: { id: event.targetId } };
      }
      return {};
    }),
    clearDestination: assign({
      destination: null,
    }),
    clearTarget: assign({
      target: null,
    }),
    clearAll: assign({
      destination: null,
      target: null,
    }),
  },
}).createMachine({
  id: 'example',
  initial: 'idle',
  context: {
    destination: null,
    target: null,
  },
  states: {
    idle: {
      on: {
        MOVE_TO: {
          target: 'moving',
          actions: 'setDestination',
        },
        INTERACT: {
          target: 'interacting',
          actions: 'setTarget',
        },
      },
    },
    moving: {
      on: {
        MOVE_TO: {
          // New destination overrides current
          actions: 'setDestination',
        },
        INTERACT: {
          target: 'interacting',
          actions: ['clearDestination', 'setTarget'],
        },
        ARRIVED: {
          target: 'idle',
          actions: 'clearDestination',
        },
        CANCEL: {
          target: 'idle',
          actions: 'clearAll',
        },
      },
    },
    interacting: {
      on: {
        MOVE_TO: {
          target: 'moving',
          actions: ['clearTarget', 'setDestination'],
        },
        INTERACT: {
          // Switch to new target
          actions: 'setTarget',
        },
        CANCEL: {
          target: 'idle',
          actions: 'clearAll',
        },
      },
    },
  },
});

export type ExampleState = 'idle' | 'moving' | 'interacting';

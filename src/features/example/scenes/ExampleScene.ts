import Phaser from 'phaser';
import { createActor } from 'xstate';
import { LAYERS } from '../../../core/config';
import { StatBar, HP_BAR_DEFAULTS } from '../../../components/StatBar';
import { FloatingText } from '../../../vfx/primitives/FloatingText';
import { GameEventManager, GameEvents } from '../../../components/GameEventManager';
import { exampleMachine } from '../machines';

/**
 * Example scene demonstrating the template's features.
 * Click to spawn floating text, watch the HP bar animate.
 */
export class ExampleScene extends Phaser.Scene {
  private hpBar!: StatBar;
  private floatingText!: FloatingText;
  private currentHp = 100;
  private maxHp = 100;
  private actor!: ReturnType<typeof createActor<typeof exampleMachine>>;

  constructor() {
    super({ key: 'ExampleScene' });
  }

  create(): void {
    // Background
    this.add.rectangle(400, 300, 800, 600, 0x2d2d44).setDepth(LAYERS.BACKGROUND);

    // Instructions
    this.add.text(400, 50, 'Click anywhere to spawn floating text', {
      fontSize: '16px',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(LAYERS.UI_OVERLAY);

    this.add.text(400, 80, 'Press SPACE to take damage, R to heal', {
      fontSize: '14px',
      color: '#aaaaaa',
    }).setOrigin(0.5).setDepth(LAYERS.UI_OVERLAY);

    // HP Bar demo
    this.hpBar = new StatBar(this, {
      ...HP_BAR_DEFAULTS,
      width: 200,
      height: 20,
      offsetY: 0,
    });

    // Floating text system
    this.floatingText = new FloatingText(this);

    // Game event manager (decoupled event handling)
    new GameEventManager(this, {
      onDamage: ({ x, y, amount }) => this.floatingText.showDamage(x, y, amount),
      onHeal: ({ x, y, amount }) => this.floatingText.showHeal(x, y, amount),
      onFloatingText: ({ x, y, text, color }) => this.floatingText.show({ x, y, text, color }),
    });

    // XState machine demo
    this.actor = createActor(exampleMachine);
    this.actor.subscribe((state) => {
      console.log('State:', state.value, 'Context:', state.context);
    });
    this.actor.start();

    // Input handlers
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.events.emit(GameEvents.FLOATING_TEXT, {
        x: pointer.worldX,
        y: pointer.worldY,
        text: 'Click!',
        color: '#ffcc00',
      });

      // Demo: send MOVE_TO event to state machine
      this.actor.send({ type: 'MOVE_TO', x: pointer.worldX, y: pointer.worldY });
    });

    // Keyboard handlers
    this.input.keyboard?.on('keydown-SPACE', () => {
      const damage = Phaser.Math.Between(5, 15);
      this.currentHp = Math.max(0, this.currentHp - damage);
      this.events.emit(GameEvents.DAMAGE, { x: 400, y: 300, amount: damage });
    });

    this.input.keyboard?.on('keydown-R', () => {
      const heal = Phaser.Math.Between(10, 20);
      this.currentHp = Math.min(this.maxHp, this.currentHp + heal);
      this.events.emit(GameEvents.HEAL, { x: 400, y: 300, amount: heal });
    });
  }

  update(_time: number, delta: number): void {
    // Update HP bar (centered on screen)
    this.hpBar.update(400, 300, this.currentHp, this.maxHp, delta);
  }

  shutdown(): void {
    this.actor.stop();
    this.hpBar.destroy();
  }
}
